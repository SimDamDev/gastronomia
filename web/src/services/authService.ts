import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function getSessionUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  return userId ?? null;
}

export async function requireSessionUserId(): Promise<string> {
  const userId = await getSessionUserId();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return userId;
}

export function userOwnsResource(userId: string, ownerId: string): boolean {
  return Boolean(userId) && userId === ownerId;
}


