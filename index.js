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
class HttpConverter {
  static supportedMediaTypes = [];

}

class JSONConverter extends HttpConverter {
  static supportedMediaTypes = ['application/json'];
}

var json = new JSONConverter();
