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
import {isJsObject, isString, isPresent} from '../../common/util';
import {error} from '../../common/assert';

export class HttpResponse {
  responseType;
  readyState;
  url;
  status;
  statusText;
  headers;
  body;

  constructor({responseType='json', url='', status, statusText, readyState, headers={}, body=''}={}) {
    this.responseType = responseType;
    this.url = url;
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.body = body;
    this.readyState = readyState;
  }

  json() {
    var jsonResponse = null;
    if (isJsObject(this.body)) {
      jsonResponse = this.body;
    } else if (isString(this.body)) {
      jsonResponse = JSON.parse(this.body);
    }
    return jsonResponse;
  }

  text() {
    return isPresent(this.body) ? this.body.toString() : '';
  }
}
