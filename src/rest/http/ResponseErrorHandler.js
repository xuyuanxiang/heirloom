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
import {ClientHttpResponse} from './ClientHttpResponse';

export class ResponseErrorHandler {
  hasError(clientHttpResponse) {
    if (clientHttpResponse instanceof ClientHttpResponse) {
      clientHttpResponse.statusCode
    } else {
      return true;
    }
  }
}
