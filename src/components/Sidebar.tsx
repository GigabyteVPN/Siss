'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Calendar, DollarSign, Home, LogOut, Settings, Users } from 'lucide-react';
import type { User } from 'lucia';

interface SidebarProps {
  user: User;
}

const navItems = [
  { href: '/dashboard', label: 'Дашборд', icon: Home },
  { href: '/students', label: 'Ученики', icon: Users },
  { href: '/schedule', label: 'Расписание', icon: Calendar },
  { href: '/payments', label: 'Оплаты', icon: DollarSign },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 border-r bg-card min-h-screen p-4 flex flex-col">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-xl font-bold">TutorHub</h2>
            <p className="text-xs text-muted-foreground">
              {user?.niche === 'tutor' ? 'Репетитор' : user?.niche || 'Специалист'}
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-foreground transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Настройки</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive hover:text-destructive-foreground text-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
