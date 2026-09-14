'use client';

import { useForm } from 'react-hook-form';
import { register } from './action';
import Link from 'next/link';
import { useState } from 'react';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { register: registerField, handleSubmit } = useForm<{ email: string; password: string; name: string }>();

  const onSubmit = async (data: { email: string; password: string; name: string }) => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('password', data.password);
    formData.set('name', data.name);
    
    const result = await register(formData);
    
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Имя
          </label>
          <input
            id="name"
            type="text"
            {...registerField('name')}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Иван Иванов"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...registerField('email')}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            {...registerField('password')}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

        {error && (
          <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
}
