import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth-utils';

export default async function HomePage() {
  const { session } = await validateRequest();
  
  if (session) {
    redirect('/dashboard');
  }
  
  redirect('/login');
}
