"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configEnv = require("../env/config-env");

var nodemailer = _interopRequireWildcard(require("nodemailer"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const transport = nodemailer.createTransport({
  host: _configEnv.ENV.MAIL_HOST,
  port: _configEnv.ENV.MAIL_PORT,
  auth: {
    user: _configEnv.ENV.MAIL_USER,
    pass: _configEnv.ENV.MAIL_PASS
  }
});
const options = {
  viewEngine: {
    extname: '.html',
    // handlebars extension
    layoutsDir: _path.default.resolve('./src/resources/mail/auth'),
    // location of handlebars templates
    defaultLayout: 'forgot-pass',
    // name of main template
    partialsDir: _path.default.resolve('./src/resources/mail/auth') // location of your subtemplates aka. header, footer etc

  },
  viewPath: _path.default.resolve('./src/resources/mail/auth'),
  extName: '.html'
};
transport.use('compile', (0, _nodemailerExpressHandlebars.default)(options));
var _default = transport;
exports.default = _default;