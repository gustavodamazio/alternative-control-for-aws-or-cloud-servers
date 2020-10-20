"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class HttpsResponse {
  constructor({
    details,
    message,
    status_code,
    status_message,
    type
  }) {
    this.details = void 0;
    this.message = void 0;
    this.status_code = void 0;
    this.status_message = void 0;
    this.type = void 0;
    this.details = details;
    this.message = message;
    this.status_code = status_code;
    this.status_message = status_message;
    this.type = type;
  }

  fromJson() {
    const data = Object.assign({}, { ...this
    });
    delete data.fromJson;
    return data;
  }

}

exports.default = HttpsResponse;