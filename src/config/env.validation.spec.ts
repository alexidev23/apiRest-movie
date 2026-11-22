import 'reflect-metadata';
import { validateEnv } from './env.validation';

const validEnv = {
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db?schema=public',
  JWT_SECRET: 'super-secret-value',
};

describe('validateEnv', () => {
  it('accepts a minimal valid environment and applies defaults', () => {
    const env = validateEnv({ ...validEnv });

    expect(env.PORT).toBe(3000);
    expect(env.NODE_ENV).toBe('development');
    expect(env.JWT_EXPIRES_IN).toBe('1d');
  });

  it('coerces PORT to a number', () => {
    const env = validateEnv({ ...validEnv, PORT: '8080' });

    expect(env.PORT).toBe(8080);
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(() => validateEnv({ JWT_SECRET: validEnv.JWT_SECRET })).toThrow(
      /DATABASE_URL/,
    );
  });

  it('rejects a JWT_SECRET shorter than 8 characters', () => {
    expect(() => validateEnv({ ...validEnv, JWT_SECRET: 'short' })).toThrow(
      /JWT_SECRET/,
    );
  });
});
