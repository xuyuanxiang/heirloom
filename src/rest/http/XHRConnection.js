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
import {HttpRequest} from './HttpRequest';
import {HttpResponse} from './HttpResponse';
import {isDefined} from '../../common/util';
import {error} from '../../common/assert';
import {BrowserXHR} from './BrowserXHR';

export class XHRConnection {
  request;
  response;
  xhr;

  constructor(request, response, xhr = new BrowserXHR().build()) {
    error(isDefined(request) && request instanceof HttpRequest,
      new TypeError('"request" expected: HttpRequest'));
    error(isDefined(response) && response instanceof HttpResponse,
      new TypeError('"response" expected: HttpResponse'));
    this.xhr = xhr;
  }

  execute() {
    const {request, response, xhr} = this;
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
