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
export class ClientHttpRequest {
  httpHeaders = {};
  httpMethod = "GET";
  uri = null;

  constructor(xhr) {
    this.xhr = xhr;
  }

  execute() {
    return new Promise((resolve, reject)=> {
      this.xhr.open(this.httpMethod, this.uri);
      this.xhr.onreadystatechange = ()=> {

      };
      this.xhr.send();
    });
  }
}
