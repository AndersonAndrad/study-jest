const factory = require('../factories');
const App = require('../../src/App');
const truncate = require('../utils/truncate');
const request = require('supertest');
const faker = require('faker');
const { createFakerUser } = require('../factories/user.factory');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should register the user passing the necessary for the route', async () => {
    const response = await request(App).post('/user').send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(200);
  });

  it('should user already exist in the database', async () => {
    const user = await factory.create('User');

    const response = await request(App).post('/user').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(401);
  });

  it('should return all user data', async () => {
    const user = createFakerUser();

    const response = await request(App).post('/user').send(user);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', user.name);
    expect(response.body).toHaveProperty('email', user.email);
  });

  it('should error missing name', async () => {
    const response = await request(App).post('/user').send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(401);
  });

  it('should error missing email', async () => {
    const response = await request(App).post('/user').send({
      name: faker.name.findName(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(401);
  });

  it('should error missing password', async () => {
    const response = await request(App).post('/user').send({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });

    expect(response.status).toBe(401);
  });
});
