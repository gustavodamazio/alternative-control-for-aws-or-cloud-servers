"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

const Connection = (0, _typeorm.createConnection)();
console.log('Success connect in SQL db.');
var _default = Connection;
exports.default = _default;