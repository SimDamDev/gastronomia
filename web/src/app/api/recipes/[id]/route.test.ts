// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({ status: init?.status ?? 200, json: async () => data }),
  },
}));

jest.mock('next-auth', () => {
  const getServerSession = jest.fn();
  const NextAuthDefault = jest.fn(() => (req: any) => req);
  return { __esModule: true, default: NextAuthDefault, getServerSession };
});

jest.mock('@/lib/prisma', () => {
  const recipe = {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const recipeIngredient = { deleteMany: jest.fn() };
  const recipeStep = { deleteMany: jest.fn() };
  return { prisma: { recipe, recipeIngredient, recipeStep } };
});

import { NextResponse } from 'next/server';

const { getServerSession } = jest.requireMock('next-auth') as { getServerSession: jest.Mock };
const { prisma } = jest.requireMock('@/lib/prisma') as any;

let PATCH: any;

describe('/api/recipes/[id] handlers', () => {
  beforeAll(() => {
    // @ts-ignore
    global.Request = class {
      url: string;
      method?: string;
      headers?: any;
      _body?: any;
      constructor(url: string, init?: any) {
        this.url = url;
        this.method = init?.method;
        this.headers = init?.headers;
        this._body = init?.body;
      }
      async json() { return JSON.parse(this._body || '{}'); }
    } as any;

    const route = require('./route');
    PATCH = route.PATCH;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('PATCH retourne 401 si non connecté', async () => {
    getServerSession.mockResolvedValueOnce(null);
    const req = new Request('http://localhost/api/recipes/r1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    } as any);
    const res = (await PATCH(req, { params: { id: 'r1' } })) as NextResponse;
    expect(res.status).toBe(401);
  });

  it('PATCH retourne 400 si payload invalide', async () => {
    getServerSession.mockResolvedValueOnce({ user: { id: 'owner' } });
    prisma.recipe.findUnique.mockResolvedValueOnce({ id: 'r1', ownerId: 'owner' });
    const req = new Request('http://localhost/api/recipes/r1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'a', ingredients: [], steps: [], totalMinutes: 0, difficulty: 'invalid' }),
    } as any);

    const res = (await PATCH(req, { params: { id: 'r1' } })) as NextResponse;
    expect(res.status).toBe(400);
  });
});


