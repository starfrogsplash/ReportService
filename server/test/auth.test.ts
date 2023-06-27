import request from 'supertest';
import { app } from '../src/app';
import db from '../knexConfig';
import bcrypt from 'bcrypt';

describe('Auth endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  }, 5000); // 5 seconds timeout

  describe('Endpoint: POST /signup', () => {
    test('creates a new user and sets the JWT in a cookie', async () => {
      const response = await request(app)
        .post('/signup')
        .send({
          username: 'john Test',
          email: 'test@example.com',
          password: 'password',
        })
        .expect(201);

      // Make sure the user was added to the database
      const user = await db('User').where('email', 'test@example.com').first();
      expect(user).toBeDefined();
      expect(user.email).toBe('test@example.com');

      // Make sure the password was hashed
      expect(await bcrypt.compare('password', user.password)).toBe(true);

      // Make sure the token is set in a cookie
      expect(response.headers['set-cookie'][0]).toMatch(/^token=.+/);
      expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
    });
  });

  describe('Endpoint: POST /login', () => {
    test('logs in an existing user and sets the JWT in a cookie', async () => {
      // Create a new user
      await db('User').insert({
        username: 'mighty mouse',
        email: 'mighty@mouse.com',
        password: await bcrypt.hash('password', 10),
      });

      const response = await request(app)
        .post('/login')
        .send({
          email: 'mighty@mouse.com',
          password: 'password',
        })
        .expect(200);

      expect(response.body.message).toBe('User logged in successfully');

      // Make sure the token is set in a cookie
      expect(response.headers['set-cookie'][0]).toMatch(/^token=.+/);
      expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
    });
  });

  describe('Endpoint: POST /logout', () => {
    test('clears the token cookie', async () => {
      const response = await request(app).post('/logout').expect(200);

      expect(response.body.message).toBe('User logged out successfully');
      expect(response.headers['set-cookie'][0]).toMatch(/token=;/);
    });
  });
});
