const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

const validateToken = (req) => {
  let token = '';

  if (req.headers.authorization !== undefined) {
    [, token] = req.headers.authorization.split('Bearer ');
  }

  if (token === '') {
    return {
      status: 402,
      success: false,
      message: 'Token lipsa. Tokenul este necesar',
    };
  }

  let tokenInfo = {};
  try {
    tokenInfo = jwt.verify(token, jwtSecretKey);
  } catch (JsonWebTokenError) {
    return {
      status: 401,
      success: false,
      message: 'Token invalid sau expirat',
    };
  }

  if (tokenInfo.id === undefined) {
    return {
      status: 404,
      success: false,
      message: 'Tokenul nu apartine niciunui utilizator',
    };
  }

  return  {
    status: 200,
    success: true,
    data: tokenInfo,
  };
};

module.exports.isAuthenticated = (req, res, next) => {
  const response = validateToken(req);

  if (response.success) {
    req.user = response.data;
    req.userId = response.data.id;
    return next();
  }

  const { status, message } = response;
  return res.status(status).json({ message });
};
