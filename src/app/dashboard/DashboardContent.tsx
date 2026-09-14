'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DashboardStats {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  activeStudents: number;
  lessonsThisWeek: number;
  totalDebt: number;
  revenueByMonth: { month: string; revenue: number }[];
  revenueByStudent: { name: string; value: number }[];
  upcomingLessons: { id: string; studentName: string; date: string; time: string; price: number }[];
  debtors: { studentName: string; amount: number }[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function DashboardContent({ userId, currency }: { userId: string; currency: string }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dashboard/stats?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return <div className="text-muted-foreground">Ошибка загрузки данных</div>;
  }

  const revenueChange = stats.previousMonthRevenue > 0 
    ? ((stats.currentMonthRevenue - stats.previousMonthRevenue) / stats.previousMonthRevenue * 100).toFixed(1)
    : 0;

  const currencySymbol = currency === 'RUB' ? '₽' : currency === 'USD' ? '$' : '€';

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KPICard title="Доход за месяц" value={`${stats.currentMonthRevenue.toLocaleString()} ${currencySymbol}`} change={+revenueChange} />
        <KPICard title="Активные ученики" value={stats.activeStudents.toString()} />
        <KPICard title="Занятия на неделе" value={stats.lessonsThisWeek.toString()} />
        <KPICard title="Задолженности" value={`${stats.totalDebt.toLocaleString()} ${currencySymbol}`} variant="destructive" />
        <KPICard title="Доход прошлый месяц" value={`${stats.previousMonthRevenue.toLocaleString()} ${currencySymbol}`} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Доход по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} ${currencySymbol}`} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Доход по ученикам (топ-5)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.revenueByStudent.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.revenueByStudent.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} ${currencySymbol}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Widgets */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ближайшие занятия</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.upcomingLessons.length === 0 ? (
              <EmptyState message="Нет запланированных занятий" />
            ) : (
              <ul className="space-y-3">
                {stats.upcomingLessons.map(lesson => (
                  <li key={lesson.id} className="flex justify-between items-center p-3 bg-secondary rounded-md">
                    <div>
                      <p className="font-medium">{lesson.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(lesson.date), 'dd MMMM', { locale: ru })} в {lesson.time}
                      </p>
                    </div>
                    <span className="text-primary font-semibold">{lesson.price} {currencySymbol}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Кто должен оплатить</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.debtors.length === 0 ? (
              <EmptyState message="Все оплатили вовремя!" />
            ) : (
              <ul className="space-y-3">
                {stats.debtors.map((debtor, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 bg-destructive/10 rounded-md">
                    <span className="font-medium">{debtor.studentName}</span>
                    <span className="text-destructive font-semibold">{debtor.amount} {currencySymbol}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, variant = 'default' }: { title: string; value: string; change?: number; variant?: 'default' | 'destructive' }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% к прошлому месяцу
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-32 text-muted-foreground">
      <p>{message}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 md:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-secondary rounded-lg" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-72 bg-secondary rounded-lg" />
        <div className="h-72 bg-secondary rounded-lg" />
      </div>
    </div>
  );
}
