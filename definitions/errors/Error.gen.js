"use strict";

module.exports = [
  {
    name: 'COMMON_ERROR',
    httpStatus: 500,
    code: (process.env.APPID || 1001)*1e6+500001,
    message: '通用错误',
  },
  {
    name: 'UNAUTHORIZED',
    httpStatus: 401,
    code: (process.env.APPID || 1001)*1e6+401001,
    message: '未授权',
  },
  {
    name: 'AUTHORIZED_INVALID',
    httpStatus: 401,
    code: (process.env.APPID || 1001)*1e6+401002,
    message: '授权错误',
  },
];