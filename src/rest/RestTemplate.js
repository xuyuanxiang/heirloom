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
import {extend, isObject, isString} from '../common/util'
import {ClientHttpRequestFactory} from './http/HttpRequestFactory';
import {ResponseErrorHandler} from './http/ResponseErrorHandler';

export class RestTemplate {
  constructor({
    requestFactory = new ClientHttpRequestFactory(),
    messageConverters=[],
    errorHandler = new ResponseErrorHandler()
  }={}) {
    this.requestFactory = requestFactory;
    this.messageConverters = messageConverters;
    this.errorHandler = errorHandler;
  }
  
}
