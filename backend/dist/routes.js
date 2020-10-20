"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.machineRoutes = exports.authRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("./app/controllers");

var _Auth = _interopRequireDefault(require("./app/middlewares/Auth"));

var _AuthRequestService = require("./app/services/AuthRequestService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//#region Auth Routes
const authRoutes = _express.default.Router();

exports.authRoutes = authRoutes;
const authController = new _controllers.AuthController();
authRoutes.post('/register', _AuthRequestService.AuthRequestService.create, authController.create);
authRoutes.post('/login', _AuthRequestService.AuthRequestService.show, authController.show);
authRoutes.post('/forgot-pass', _AuthRequestService.AuthRequestService.forgotPass, authController.forgotPass);
authRoutes.post('/reset-pass', _AuthRequestService.AuthRequestService.resetPass, authController.resetPass); //#endregion
//#region Machine Routes

const machineRoutes = _express.default.Router();

exports.machineRoutes = machineRoutes;
const machineController = new _controllers.MachineController();
machineRoutes.get('/list', _Auth.default, machineController.index);
machineRoutes.post('/create', _Auth.default, machineController.createOrUpdateBatch); //#endregion