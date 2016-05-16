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
import {ClientHttpRequest} from './ClientHttpRequest';

export class ClientHttpRequestFactory {

  createRequest(url, httpMethod) {
    let xhr = new XMLHttpRequest();
    xhr.open(httpMethod, url);
    xhr.status
    return new ClientHttpRequest(xhr);
  }
}
