'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Sidebar } from '@/components/Sidebar';
import DashboardContent from './DashboardContent';
import type { User } from 'lucia';

export default function DashboardView({ user }: { user: User }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Дашборд</h1>
          <ThemeToggle />
        </div>
        <DashboardContent userId={user.id} currency={user.currency || 'RUB'} />
      </main>
    </div>
  );
}
