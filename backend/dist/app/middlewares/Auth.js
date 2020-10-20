"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authMiddleware;

var _configEnv = require("../../env/config-env");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authMiddleware(request, response, next) {
  const {
    authorization
  } = request.headers; // Get token

  if (!authorization) {
    return response.status(401).send({
      error: {
        message: 'No token provided.',
        details: {}
      }
    });
  }

  const parts = authorization.split(' ');

  if (!(parts.length === 2)) {
    return response.status(401).send({
      error: {
        message: 'Token error',
        details: {}
      }
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({
      error: {
        message: 'Token bad formatted',
        details: {}
      }
    });
  }

  _jsonwebtoken.default.verify(token, _configEnv.ENV.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        error: {
          message: 'Token invalid',
          details: {
            token: err.message
          }
        }
      });
    } else {
      request.userId = decoded.id;
      return next();
    }
  });
}