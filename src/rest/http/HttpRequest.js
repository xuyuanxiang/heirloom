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
import {isPresent, isString} from '../../common/util';
import {error} from '../../common/assert';

export class HttpRequest {
  headers;
  method;
  url;
  body;

  constructor({headers={}, method='GET', url='', body=''}={}) {
    error(isString(method), new TypeError('"method" expected: String'));
    error(isString(url), new TypeError('"url" expected: String'));
    error(isString(body), new TypeError('"body" expected: String'));

    this.headers = headers;
    this.method = method;
    this.url = url;
    this.body = body;
  }

  text() {
    return isPresent(this.body) ? this.body.toString() : '';
  }
}
