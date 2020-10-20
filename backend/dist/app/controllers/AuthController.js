"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _crypto = _interopRequireDefault(require("crypto"));

var _dateFns = require("date-fns");

var _genJwt = require("../../utils/gen-jwt");

var _mailer = _interopRequireDefault(require("../../modules/mailer"));

var _User = require("../models/User");

var _HttpsResponse = _interopRequireDefault(require("../models/HttpsResponse"));

var _HttpStatusCodes = require("../models/HttpStatusCodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  // -----------------------------------------------------------------------------------------------------
  // @ Login
  // -----------------------------------------------------------------------------------------------------
  //#region Show
  async show(request, response) {
    const {
      email,
      password
    } = request.body;
    const user = await _User.User.findOne({
      email
    }).select('+password');

    if (!user) {
      return response.status(_HttpStatusCodes.HttpStatusCode.NotFound).send(new _HttpsResponse.default({
        details: {},
        message: 'User not found',
        status_code: _HttpStatusCodes.HttpStatusCode.NotFound,
        status_message: 'Not Found',
        type: 'error'
      }).fromJson());
    }

    if (!(await _bcryptjs.default.compare(password, user.password))) {
      return response.status(_HttpStatusCodes.HttpStatusCode.Unauthorized).send(new _HttpsResponse.default({
        details: {},
        message: 'Email or Password is invalid.',
        status_code: _HttpStatusCodes.HttpStatusCode.Unauthorized,
        status_message: 'Unauthorized',
        type: 'error'
      }).fromJson());
    }

    user.password = undefined; // Remove password this response.

    return response.status(_HttpStatusCodes.HttpStatusCode.Ok).json(new _HttpsResponse.default({
      details: {
        user,
        token: _genJwt.JwtHelper.gen(user.id)
      },
      message: 'Logged.',
      status_code: _HttpStatusCodes.HttpStatusCode.Ok,
      status_message: 'OK',
      type: 'success'
    }).fromJson());
  } //#endregion
  // -----------------------------------------------------------------------------------------------------
  // @ Register
  // -----------------------------------------------------------------------------------------------------
  //#region CREATE


  async create(request, response) {
    try {
      if (await _User.User.findOne({
        email: request.body.email
      })) {
        return response.status(400).send({
          error: {
            message: 'User email already existis',
            details: {}
          }
        });
      }

      const user = await _User.User.create(request.body);
      user.password = undefined;
      return response.status(201).json({
        user,
        token: _genJwt.JwtHelper.gen(user.id)
      });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        error: {
          message: 'Registration failed',
          details: {
            db: error.message
          }
        }
      });
    }
  } //#endregion
  // -----------------------------------------------------------------------------------------------------
  // @ Forgot pass
  // -----------------------------------------------------------------------------------------------------
  //#region forgot pass


  async forgotPass(request, response) {
    const {
      email
    } = request.body;

    try {
      const user = await _User.User.findOne({
        email
      });

      if (!user) {
        return response.status(404).send({
          error: {
            message: 'User not found',
            details: {}
          }
        });
      }

      const token = _crypto.default.randomBytes(20).toString('hex');

      const nowMoreOne = (0, _dateFns.addHours)(new Date(), 1);
      await _User.User.findOneAndUpdate({
        _id: user.id
      }, {
        $set: {
          passwordResetExpires: nowMoreOne,
          passwordResetToken: token
        }
      });

      _mailer.default.sendMail({
        to: email,
        subject: 'CLOUD PROJECT - REDEFINIÇÃO DE SENHA',
        from: 'gustavo@gdpro.com.br',
        template: 'forgot-pass',
        context: {
          token
        }
      }, err => {
        if (err) {
          console.error(err);
          return response.status(400).send({
            error: {
              message: 'Cannot send forgot password email.',
              details: {}
            }
          });
        }

        return response.status(200).json({
          ok: true
        });
      });
    } catch (error) {
      console.error(error);
      return response.status(400).send({
        error: {
          message: 'Erro on forgot password, try again.',
          details: {}
        }
      });
    }
  } //#endregion
  // -----------------------------------------------------------------------------------------------------
  // @ Reset pass
  // -----------------------------------------------------------------------------------------------------


  async resetPass(request, response) {
    const {
      email,
      passwordResetToken,
      password
    } = request.body;

    try {
      const user = await _User.User.findOne({
        email
      }).select('+passwordResetToken passwordResetExpires');

      if (!user) {
        return response.status(404).send({
          error: {
            message: 'User not found',
            details: {}
          }
        });
      }

      if (passwordResetToken !== user.passwordResetToken) {
        return response.status(401).send({
          error: {
            message: 'Token invalid',
            details: {}
          }
        });
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return response.status(400).send({
          error: {
            message: 'Token expired, generate a new one.',
            details: {}
          }
        });
      }

      user.password = password;
      user.passwordResetExpires = new Date();
      await user.save();
      return response.status(200).json({
        ok: true
      });
    } catch (error) {
      console.error(error);
      return response.status(400).send({
        error: {
          message: 'Cannot reset password, try again.',
          details: {}
        }
      });
    }
  }

}

exports.default = AuthController;