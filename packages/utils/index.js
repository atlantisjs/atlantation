const toString = Object.prototype.toString

export const isAsyncFunction = (func) => toString.call(func) === '[object AsyncFunction]';
