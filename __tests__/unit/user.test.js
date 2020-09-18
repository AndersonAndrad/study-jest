const bcrypt = require('bcryptjs');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'anderson',
      email: 'anderson_andrade_@outlook.com',
      password: '123123',
    });

    expect(await bcrypt.compare('123123', user.password_hash)).toBe(true);
  });
});
