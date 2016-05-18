/**
 * @name
 * @description
 * @usage
 *
 * ==================================================
 * @version 1.0.0
 * @author xuyuanxiang
 * @date 16/5/18
 * ==================================================
 * @version
 * @updator
 * @date
 * @changelog
 *
 * ==================================================
 * ...
 */
import {isMap, isString, isObject} from '../../common/util';

export class HttpHeaders {
  headers = new Map();

  constructor(headers) {
    if (isMap(headers)) {
      this.headers = headers;
    } else if (isObject(headers)) {
      for (let attr in headers) {
        this.headers.set(attr, headers[attr]);
      }
    } else if (isString(headers)) {

    }
  }

  has(key) {
    return this.headers.has(key);
  }

  set(key, value) {
    this.set(key, value);
  }

  get(key) {
    return this.headers.get(key);
  }
}
