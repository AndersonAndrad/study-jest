const request = require('supertest');
const App = require('../../src/App');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(App).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123321',
    });

    const response = await request(App).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.status).toBe(401);
  });

  it('should return JWT token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(App).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(App)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without JWT token', async () => {
    const user = await factory.create('User');

    const response = await request(App).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid JWT', async () => {
    const user = await factory.create('User');

    const response = await request(App)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
