import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth-utils';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  const { session } = await validateRequest();
  
  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">TutorHub</h1>
          <p className="text-muted-foreground">Вход в систему</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
