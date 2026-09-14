import { Lucia, Session, User } from 'lucia';
import { prisma } from './prisma';
import type { User as DbUser } from '@prisma/client';

const adapter = {
  getUser: async (userId: string) => {
    return prisma.user.findUnique({ where: { id: userId } });
  },
  getSession: async (sessionId: string) => {
    return prisma.session.findUnique({ where: { id: sessionId } });
  },
  getUserBySessionId: async (sessionId: string) => {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
    return session?.user ?? null;
  },
  getSessionAndUser: async (sessionId: string) => {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
    if (!session) return null;
    return { user: session.user, session };
  },
  updateUser: async (userId: string, data: Partial<DbUser>) => {
    return prisma.user.update({ where: { id: userId }, data });
  },
  deleteUser: async (userId: string) => {
    return prisma.user.delete({ where: { id: userId } });
  },
  deleteSession: async (sessionId: string) => {
    return prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
  },
  createSession: async (sessionId: string, userId: string, expiresAt: Date) => {
    return prisma.session.create({
      data: { id: sessionId, userId, expiresAt },
    });
  },
};

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      email: databaseUserAttributes.email,
      name: databaseUserAttributes.name,
      niche: databaseUserAttributes.niche,
      currency: databaseUserAttributes.currency,
      timezone: databaseUserAttributes.timezone,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DbUser, 'password'>;
  }
}
