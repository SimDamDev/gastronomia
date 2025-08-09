import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Polyfills globaux pour l'environnement de test
// @ts-ignore
const g: any = globalThis as any;
try {
  const undici = require('undici');
  g.fetch = g.fetch || undici.fetch;
  g.Headers = g.Headers || undici.Headers;
  g.Request = g.Request || undici.Request;
  g.Response = g.Response || undici.Response;
} catch {}

if (typeof g.URLSearchParams === 'undefined' && typeof URLSearchParams !== 'undefined') {
  g.URLSearchParams = URLSearchParams as any;
}
