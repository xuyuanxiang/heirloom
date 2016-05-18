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
import {HttpRequest} from './HttpRequest';

export class HttpRequestFactory {

  createRequest(url, httpMethod) {
    let xhr = new XMLHttpRequest();
    xhr.open(httpMethod, url);
    xhr.status;
    
  }
}
