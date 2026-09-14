import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek } from 'date-fns';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const now = new Date();
    
    // Current month dates
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    
    // Previous month dates
    const previousMonthStart = startOfMonth(subMonths(now, 1));
    const previousMonthEnd = endOfMonth(subMonths(now, 1));
    
    // This week dates
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    // Get completed lessons for revenue calculation
    const currentMonthLessons = await prisma.lesson.findMany({
      where: {
        userId,
        status: 'completed',
        date: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      include: { student: true },
    });

    const previousMonthLessons = await prisma.lesson.findMany({
      where: {
        userId,
        status: 'completed',
        date: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
      include: { student: true },
    });

    // Calculate revenues
    const currentMonthRevenue = currentMonthLessons.reduce((sum, lesson) => sum + lesson.price, 0);
    const previousMonthRevenue = previousMonthLessons.reduce((sum, lesson) => sum + lesson.price, 0);

    // Active students count
    const activeStudents = await prisma.student.count({
      where: {
        userId,
        status: 'active',
      },
    });

    // Lessons this week
    const lessonsThisWeek = await prisma.lesson.count({
      where: {
        userId,
        date: {
          gte: weekStart,
          lte: weekEnd,
        },
        status: {
          in: ['scheduled', 'completed'],
        },
      },
    });

    // Calculate debt (completed but not paid lessons)
    const allLessons = await prisma.lesson.findMany({
      where: {
        userId,
        status: 'completed',
      },
      include: {
        payments: {
          include: { payment: true },
        },
        student: true,
      },
    });

    // Calculate debt per student
    const debtMap = new Map<string, number>();
    for (const lesson of allLessons) {
      const paidAmount = lesson.payments.reduce((sum, pl) => sum + pl.amount, 0);
      const unpaid = lesson.price - paidAmount;
      if (unpaid > 0) {
        const currentDebt = debtMap.get(lesson.studentId) || 0;
        debtMap.set(lesson.studentId, currentDebt + unpaid);
      }
    }

    const totalDebt = Array.from(debtMap.values()).reduce((sum, val) => sum + val, 0);
    
    const debtors = await Promise.all(
      Array.from(debtMap.entries())
        .filter(([_, amount]) => amount > 0)
        .slice(0, 10)
        .map(async ([studentId, amount]) => {
          const student = await prisma.student.findUnique({
            where: { id: studentId },
            select: { name: true },
          });
          return { studentName: student?.name || 'Unknown', amount };
        })
    );

    // Revenue by month (last 6 months)
    const revenueByMonth = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));
      const monthLessons = await prisma.lesson.findMany({
        where: {
          userId,
          status: 'completed',
          date: { gte: monthStart, lte: monthEnd },
        },
      });
      const revenue = monthLessons.reduce((sum, l) => sum + l.price, 0);
      const monthName = monthStart.toLocaleString('ru', { month: 'short', year: '2-digit' });
      revenueByMonth.push({ month: monthName, revenue });
    }

    // Revenue by student (top 5)
    const studentRevenue = new Map<string, number>();
    const allCompletedLessons = await prisma.lesson.findMany({
      where: { userId, status: 'completed' },
      include: { student: true },
    });
    
    for (const lesson of allCompletedLessons) {
      const currentRev = studentRevenue.get(lesson.studentId) || 0;
      studentRevenue.set(lesson.studentId, currentRev + lesson.price);
    }

    const sortedStudents = Array.from(studentRevenue.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const revenueByStudent = await Promise.all(
      sortedStudents.map(async ([studentId, value]) => {
        const student = await prisma.student.findUnique({
          where: { id: studentId },
          select: { name: true },
        });
        return { name: student?.name || 'Unknown', value };
      })
    );

    // Upcoming lessons
    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        userId,
        date: { gte: now },
        status: 'scheduled',
      },
      include: { student: true },
      orderBy: { date: 'asc' },
      take: 5,
    });

    return NextResponse.json({
      currentMonthRevenue,
      previousMonthRevenue,
      activeStudents,
      lessonsThisWeek,
      totalDebt,
      revenueByMonth,
      revenueByStudent,
      upcomingLessons: upcomingLessons.map(l => ({
        id: l.id,
        studentName: l.student.name,
        date: l.date.toISOString(),
        time: l.startTime,
        price: l.price,
      })),
      debtors,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
