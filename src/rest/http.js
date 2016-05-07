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

import {noop, isDefined, isArray, isObject, isString, isFunction} from "../common/util"
class HttpInterceptor {

}
class HttpConverters {

}

export class Http {
    constructor({httpInterceptor, httpConvert}) {

    }

    request({url='', method='GET', data={}, success=noop, error=noop, headers={}, withCredentials=true}={}) {
        this.promise = new Promise((resolve, reject) => {
            let xhr = XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = withCredentials;
            for (let name in headers) {
                xhr.setRequestHeader(name, headers[name]);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(data));
        });
    }

    static get(url, params) {

    }

}
