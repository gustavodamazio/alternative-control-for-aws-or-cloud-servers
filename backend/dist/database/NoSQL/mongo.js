"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configEnv = require("../../env/config-env");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_configEnv.ENV.MONGO_DB) {
  _mongoose.default.connect(_configEnv.ENV.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    console.log('Success connect in NoSQL db.');
  }).catch(err => {
    console.error('Error in database connection.');
    throw new Error(err.message);
  });
} else {
  throw new Error(`fail to connect in db because process.env.MONGO_DB not existis.`);
}

var _default = _mongoose.default;
exports.default = _default;