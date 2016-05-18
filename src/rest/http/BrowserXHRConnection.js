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
import {Connection} from './Connection';
import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';
import {isDefined} from '../../common/util';
import {error} from '../../common/assert';

export class BrowserXHRConnection extends Connection {
  request;
  response;

  static getDefaultConnection(request) {
    let response = new HttpResponse({responseType: 'json'});
    return new BrowserXHRConnection(request, response);
  }

  constructor(request, response) {
    error(isDefined(request) && request instanceof HttpRequest,
      new TypeError('"request" expected: HttpRequest'));
    error(isDefined(response) && response instanceof HttpResponse,
      new TypeError('"response" expected: HttpResponse'));
    this.request = request;
    this.response = response;
  }

  execute() {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const {request, response} = this;
    const {method, url, headers, body} = request;
    return new Promise((resolve, reject)=> {
      xhr.open(method, url);
      for (let name in headers) {
        xhr.setRequestHeader(name, headers[name]);
      }
      xhr.responseType = response.responseType;
      response.url = url;
      xhr.onreadystatechange = function () {
        response.body = xhr.responseText;
        response.status = xhr.status;
        response.statusText = xhr.statusText;
        response.readyState = xhr.readyState;
      };
      xhr.onload = function (e) {
        resolve(response);
      };
      xhr.onerror = function (e) {
        reject(response);
      };
      xhr.send(body);
    });
  }
}
