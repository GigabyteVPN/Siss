import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth';
import { validateRequest } from '@/lib/auth-utils';

export async function getCurrentUser() {
  const { session } = await validateRequest();
  if (!session) {
    return null;
  }
  return session.user;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  
  if (!sessionId) {
    return null;
  }

  const result = await lucia.validateSession(sessionId);
  
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result.session;
}
