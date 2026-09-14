import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth-utils';
import DashboardView from './DashboardView';

export default async function DashboardPage() {
  const { session, user } = await validateRequest();
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardView user={user} />
    </div>
  );
}
