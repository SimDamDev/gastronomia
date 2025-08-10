jest.mock('next-auth', () => {
  const getServerSession = jest.fn();
  return { __esModule: true, getServerSession };
});

import { getServerSession } from 'next-auth';
import { getSessionUserId, requireSessionUserId, userOwnsResource } from './authService';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSessionUserId retourne null si pas de session', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);
    await expect(getSessionUserId()).resolves.toBeNull();
  });

  it('getSessionUserId retourne un id si connecté', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({ user: { id: 'u1' } });
    await expect(getSessionUserId()).resolves.toBe('u1');
  });

  it('requireSessionUserId lève si non connecté', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);
    await expect(requireSessionUserId()).rejects.toThrow('Unauthorized');
  });

  it('userOwnsResource compare les ids', () => {
    expect(userOwnsResource('a', 'a')).toBe(true);
    expect(userOwnsResource('a', 'b')).toBe(false);
    expect(userOwnsResource('', 'b')).toBe(false);
  });
});


