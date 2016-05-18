/**
 * @name
 * @description
 * @usage
 *
 * ==================================================
 * @version 1.0.0
 * @author xuyuanxiang
 * @date 16/5/16
 * ==================================================
 * @version
 * @updator
 * @date
 * @changelog
 *
 * ==================================================
 * ...
 */
import {isPresent, isString, isBoolean} from '../../common/util';
import {error} from '../../common/assert';

export class HttpRequest {
  headers;
  method;
  url;
  body;
  withCredentials = true;

  constructor({headers={}, method='GET', url='', body='', withCredentials=true}={}) {
    error(isString(method), new TypeError('"method" expected: String'));
    error(isString(url), new TypeError('"url" expected: String'));
    error(isString(body), new TypeError('"body" expected: String'));
    error(isBoolean(withCredentials), new TypeError('"withCredentials" expected: Boolean'));
    this.headers = headers;
    this.method = method;
    this.url = url;
    this.body = body;
    this.withCredentials = withCredentials;
  }

  text() {
    return isPresent(this.body) ? this.body.toString() : '';
  }
}
