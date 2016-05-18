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
import {HttpResponse} from './HttpResponse';

export class ResponseErrorHandler {
  hasError(response) {
    if (response instanceof HttpResponse) {
      return response.status !== 200;
    } else {
      return true;
    }
  }
}
