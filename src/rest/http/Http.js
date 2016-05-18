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

import {noop, isDefined, isArray, isObject, isString, isFunction} from "../../common/util";
import {BrowserXHRConnection} from './BrowserXHRConnection';
import {HttpRequest} from './HttpRequest';
import {ResponseErrorHandler} from './ResponseErrorHandler';

export class Http {
  constructor({
    httpInterceptors = [],
    messageConverters = [],
    httpRequestFactory = new HttpRequestFactory(),
    errorHandler = new ResponseErrorHandler()
  }={}) {
    this.httpInterceptors = httpInterceptors;
    this.messageConverters = messageConverters;
    this.httpRequestFactory = httpRequestFactory;
    this.errorHandler = errorHandler;
  }

  request({url='', method='GET', params, headers={}, withCredentials=true}={}) {
    let body = '';
    let request = new HttpRequest({headers, url, method, withCredentials, body});
    let connection = BrowserXHRConnection.getDefaultConnection(request);
    return connection.execute();
  }

  get(url, params) {
    return this.request({})
  }

  post() {

  }

  delete() {

  }

  patch() {

  }
}

