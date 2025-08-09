// Mock NextResponse pour éviter la dépendance à Response/Headers en environnement Jest
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({ status: init?.status ?? 200, json: async () => data }),
  },
}));

import { NextResponse } from 'next/server';

// Mock next-auth: fournir un default (NextAuth) factice + getServerSession
jest.mock('next-auth', () => {
  const getServerSession = jest.fn();
  const NextAuthDefault = jest.fn(() => (req: any) => req);
  return { __esModule: true, default: NextAuthDefault, getServerSession };
});

jest.mock('@/lib/prisma', () => {
  const recipe = {
    findMany: jest.fn(),
    create: jest.fn(),
  };
  const recipeIngredient = { deleteMany: jest.fn() };
  const recipeStep = { deleteMany: jest.fn() };
  return { prisma: { recipe, recipeIngredient, recipeStep } };
});

const { getServerSession } = jest.requireMock('next-auth') as { getServerSession: jest.Mock };
const { prisma } = jest.requireMock('@/lib/prisma') as any;

let POST: any;
let GET: any;

describe('/api/recipes handlers', () => {
  beforeAll(() => {
    // Minimal mock for global Request used by Next runtime in tests
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
    POST = route.POST;
    GET = route.GET;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST retourne 401 si non connecté', async () => {
    getServerSession.mockResolvedValueOnce(null);
    const req = new Request('http://localhost/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'okay', ingredients: ['a'], steps: ['b'], totalMinutes: 10, difficulty: 'easy' }),
    } as any);

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(401);
  });

  it('POST crée une recette quand connecté et payload valide', async () => {
    getServerSession.mockResolvedValueOnce({ user: { id: 'u1', email: 'u@x.com' } });
    prisma.recipe.create.mockResolvedValueOnce({ id: 'r1' });

    const req = new Request('http://localhost/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'okay', ingredients: ['a'], steps: ['b'], totalMinutes: 10, difficulty: 'easy' }),
    } as any);

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(201);
    const json = await (res as any).json();
    expect(json.id).toBe('r1');
    expect(prisma.recipe.create).toHaveBeenCalled();
  });

  it('GET retourne une liste', async () => {
    prisma.recipe.findMany.mockResolvedValueOnce([{ id: 'r1' }]);
    const req = new Request('http://localhost/api/recipes') as any;
    const res = (await GET(req)) as NextResponse;
    expect(res.status).toBe(200);
    const list = await (res as any).json();
    expect(Array.isArray(list)).toBe(true);
    expect(list[0].id).toBe('r1');
  });
});
