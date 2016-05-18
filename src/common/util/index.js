/**
 * @name
 * @description
 * @usage
 *
 * ==================================================
 * @version 1.0.0
 * @author xuyuanxiang
 * @date 16/5/8
 * ==================================================
 * @version
 * @updator
 * @date
 * @changelog
 *
 * ==================================================
 * ...
 */
export const noop = function () {
  }
  , cross = function*(label) {
    yield console.time(label);
    return console.timeEnd(label);
  }
  , forEach = (array, ...args) => Array.prototype.forEach.call(array, ...args)
  , extend = (dest, ...sources) => Object.assign(dest, ...sources)
  , copy = target => Object.assign({}, target)
  , isFunction = func => typeof func === 'function'
  , isString = str => typeof str === 'string'
  , isObject = obj => typeof obj === 'object'
  , isDefined = obj => typeof obj !== 'undefined'
  , isArray = array => Array.isArray(array)
  , isJsObject = o => o !== null && (typeof o === "function" || typeof o === "object")
  , isPresent = obj => obj !== undefined && obj !== null
  , isBoolean = b => typeof b === 'boolean'
  , isMap = m => isDefined(m) && m instanceof Map
  ;
