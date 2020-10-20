"use strict";

require("./database/SQL/connection");

var _configEnv = require("./env/config-env");

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _celebrate = require("celebrate");

var _cron = require("cron");

var _dateFns = require("date-fns");

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

console.info(`Initialize backend server port ${_configEnv.ENV.PORT}`, {
  env_init: _configEnv._env.parsed ? true : false,
  NODE_ENV: process.env.NODE_ENV
});
const app = (0, _express.default)(); // Instance express app.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
new _cron.CronJob('0 */5 * * * *', () => {
  console.log(`Batendo na api => "${_configEnv.ENV.EXT_API_URL_BASE}" => ${(0, _dateFns.format)(new Date(), 'dd/MM/yyyy HH:mm:ss')}`);
}, null, true, 'America/Los_Angeles').start(); // Trigger 5 in 5 minutes.

app.use('/auth', _routes.authRoutes); // Initialize auth routes.

app.use('/machines', _routes.machineRoutes); // Initialize machine internal api router.

app.use((0, _celebrate.errors)()); // Celebrate erros.

app.listen(_configEnv.ENV.PORT); // Listen server in specific port