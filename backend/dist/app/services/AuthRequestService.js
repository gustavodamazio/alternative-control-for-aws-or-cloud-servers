"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRequestService = void 0;

var _celebrate = require("celebrate");

class AuthRequestService {
  static get show() {
    return (0, _celebrate.celebrate)({
      [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
        email: _celebrate.Joi.string().email().required(),
        password: _celebrate.Joi.string().min(8).required()
      })
    }, {
      abortEarly: false
    });
  }

  static get create() {
    return (0, _celebrate.celebrate)({
      [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
        email: _celebrate.Joi.string().email().required(),
        password: _celebrate.Joi.string().min(8).required(),
        name: _celebrate.Joi.string().min(2).required()
      })
    }, {
      abortEarly: false
    });
  }

  static get forgotPass() {
    return (0, _celebrate.celebrate)({
      [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
        email: _celebrate.Joi.string().email().required()
      })
    }, {
      abortEarly: false
    });
  }

  static get resetPass() {
    return (0, _celebrate.celebrate)({
      [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
        email: _celebrate.Joi.string().email().required(),
        password: _celebrate.Joi.string().min(8).required(),
        passwordResetToken: _celebrate.Joi.string().required()
      })
    }, {
      abortEarly: false
    });
  }

}

exports.AuthRequestService = AuthRequestService;