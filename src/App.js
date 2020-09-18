require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env',
});
const express = require('express');

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.router();
  }

  middleware() {
    this.server.use(express.json());
  }

  router() {
    this.server.use(require('./router'));
  }
}

module.exports = new App().server;
