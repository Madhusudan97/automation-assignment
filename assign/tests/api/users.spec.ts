import { test, expect } from '@playwright/test';

const baseUrl = 'https://reqres.in';

const headers = process.env.REQRES_API_KEY
  ? { 'x-api-key': process.env.REQRES_API_KEY }
  : undefined;

test.describe('Users API', () => {
  test('GET /api/users?page=2 returns a list of users', async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/users?page=2`, { headers });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);

    for (const user of body.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });

  test('POST /api/users creates a user', async ({ request }) => {
    const newUser = { name: 'morpheus', job: 'leader' };

    const response = await request.post(`${baseUrl}/api/users`, {
      data: newUser,
      headers,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.job).toBe(newUser.job);
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  test('created user response contains a valid id and timestamp', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/users`, {
      data: { name: 'morpheus', job: 'leader' },
      headers,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(new Date(body.createdAt).getTime()).not.toBeNaN();
  });
});
