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
import {HttpRequestFactory} from './HttpRequestFactory';
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

  request({url='', method='GET', data={}, success=noop, error=noop, headers={}, withCredentials=true}={}) {
    return new Promise((resolve, reject) => {
      let xhr = XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = withCredentials;

      for (let name in headers) {
        xhr.setRequestHeader(name, headers[name]);
      }
      xhr.onreadystatechange = () => {
        switch (xhr.readyState) {
          case XMLHttpRequest.DONE:

        }
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          }
        }
      };

      // for (let interceptor of this.httpInterceptors) {
      //   if (interceptor instanceof HttpInterceptor) {
      //     interceptor.request();
      //   }
      // }
      xhr.send(JSON.stringify(data));
    });
  }

  get(url, params) {

  }

}

