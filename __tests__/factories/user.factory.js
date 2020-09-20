const faker = require('faker');

function createFakerUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

module.exports = {
  createFakerUser,
};
