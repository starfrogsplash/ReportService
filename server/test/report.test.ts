require('dotenv').config()
import request from 'supertest';
import { app } from '../src/app';
import db from '../knexConfig';
import jwt, { Secret } from 'jsonwebtoken';
import { addNewUser } from '../src/controllers/userControllers';
import bcrypt from 'bcrypt';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

describe('reportRouter endpoints', () => {
  let token: string;

  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();

    // Create a new user
    const [userId] = await addNewUser({
      username: 'test example',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    });

    // Generate JWT token
    token = jwt.sign({ userId: userId.id }, process.env.JWT_SECRET as Secret)
  });

  afterAll(async () => {
    await db.destroy();
  }, 5000); // 5 seconds timeout

  describe('POST /report', () => {
    test('should return 201 when report is successfully created', async () => {

      const report = {
        title: "ACME  Report 2025",
        description: "Environmental report for ACME covering the period 2021",
        created: new Date(),
        updated: new Date(),
        data: [
          {
            metricId: "e6.6.6",
            description: "this is a description test",
            type: "string",
            value: "1234.567"
          }
        ]
      }

      const res = await request(app)
        .post('/report')
        .send(report)
        .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toEqual(201);
      expect(res.body.uuid).toBeDefined();
      expect(res.body.report.title).toBe('ACME  Report 2025');
    });

    test('should return 401 Unauthorized if no token is provided', async () => {
      const res = await request(app).post('/report');

      expect(res.status).toBe(401);
      expect(res.body.code).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });
  });

  describe('GET /report/:uuid', () => {
    test('should return the specified report', async () => {

      const report = {
        title: "ACME Report 2030",
        description: "Environmental report for ACME covering the period 2030",
        created: new Date(),
        updated: new Date(),
        data: [
          {
            metricId: "e6.6.6",
            description: "this is a description test",
            type: "string",
            value: "1234.567"
          }
        ]
      }

      const reportRes = await request(app)
        .post('/report')
        .send(report)
        .set('Authorization', `Bearer ${token}`)

       const reportuuid = reportRes.body.uuid

      const res = await request(app)
        .get(`/report/${reportuuid}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.report.title).toBe('ACME Report 2030');
    });

    test('should return 401 Unauthorized if no token is provided', async () => {
      const res = await request(app).get('/report/123e4567-e89b-12d3-a456-426614174000');

      expect(res.status).toBe(401);
      expect(res.body.code).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });


    test('should return 404 Not Found if the report does not exist', async () => {
      const res = await request(app)
        .get('/report/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.code).toBe(404);
      expect(res.body.message).toBe('The specified resource was not found');
    });
  });
});
