const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'token not provied',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    request.userID = decoded.id;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'token invalid',
    });
  }

  return next();
};
