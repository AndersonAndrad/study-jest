const router = require('express').Router();

// controllers
const Session = require('../src/app/controllers/Session.controller');
const User = require('../src/app/controllers/User.controller');

// middlewares
const authMiddleware = require('./app/middleware/auth');

// routes
router.post('/sessions', Session.login);

router.post('/user', User.store);

router.use(authMiddleware);

router.get('/dashboard', (request, response) => {
  return response.status(200).send();
});

module.exports = router;
