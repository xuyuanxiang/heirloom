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
import {Route} from './Route'
import {extend, isObject, isString} from '../common/util'
import {Http} from './http/Http'

const http = new Http();

const MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
const DEFAULT_ERROR_MESSAGE = "请求失败! 请稍后重试...";

const ACTIONS = {
    query: {method: 'GET', pageable: true, errorTips: DEFAULT_ERROR_MESSAGE}
    , get: {method: 'GET', isArray: true}
    , create: {method: 'POST'}
    , update: {method: 'PATCH'}
    , delete: {method: 'DELETE'}
};

const isValidDottedPath = (path) => {
        return (path != null && path !== '' && path !== 'hasOwnProperty' &&
        MEMBER_NAME_REGEX.test('.' + path));
    }
    , lookupDottedPath = (obj, path) => {
        if (!isValidDottedPath(path)) {
            throw new Error("Illegal argument: Dotted member path '@{" + path + "}' is invalid.");
        }
        var keys = path.split('.');
        for (var i = 0, ii = keys.length; i < ii && isDefined(obj); i++) {
            var key = keys[i];
            obj = (obj !== null) ? obj[key] : undefined;
        }
        return obj;
    }
    , extractParams = (data, actionParams) => {
        var ids = {};
        actionParams = extend({}, actionParams);
        for (let key in actionParams) {
            let value = actionParams[key];
            if (isFunction(value)) {
                value = value();
            }
            ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                lookupDottedPath(data, value.substr(1)) : value;
        }
        return ids;
    }
    ;

class Resource {
    constructor(props) {
        extend(this, props);
        this.$promises = [];
    }

    then(resolve = noop, reject = noop) {
        while (this.$promises.length) {
            this.$promises.shift().then(resolve, reject);
        }
    }

    toJSON() {
        let json = extend({}, this);
        delete json.$promises;
        return json;
    }
}

export class RestTemplate {
    constructor({
        urlTemplate
        , defaultParams={}
        , actions={}
    } = {}) {
        this._route = new Route(urlTemplate);
        this._actions = extend({}, ACTIONS, actions)
        this._defaultParams = defaultParams;
    }

    build() {
        let route = this._route
            , defaultParams = this._defaultParams
            ;

        for (let action in this._actions) {
            let configs = this._actions[action];
            if (!isObject(configs)) continue;
            let {url, params, method, pageable, isArray, headers} = configs;
            if (pageable === true && isArray === true) {
                throw new Error("Fuck you! 'pageable' and 'isArray' can not be true at the same time.");
            }
            let actionsPrams = Object.assign({}, defaultParams, params);
            if (pageable === true) {
                Resource[action] = function (data) {
                    let {targetUrl, targetOptions} = route.setUrlParams(url, extend({}, data, extractParams(data, actionsPrams)), {
                        method: method,
                        headers: headers
                    });
                    let promise = new Promise((resolve, reject) => {
                        targetOptions.success = resp => {
                            let {code, data, message} = resp;
                            if (code == 200) {
                                let result = [];
                                for (let attr in data) {
                                    let value = data[attr];
                                    if (isArray(value)) {
                                        result.concat(value.map(item=>new Resource(item)));
                                    } else {
                                        result[attr] = value;
                                    }
                                }
                                resolve(result);
                            } else {
                                reject(message || DEFAULT_ERROR_MESSAGE);
                            }
                        };
                        targetOptions.error = resp => {
                            if (isString(resp)) {
                                reject(resp);
                            } else {
                                reject(DEFAULT_ERROR_MESSAGE);
                            }
                        };
                    });
                    http(targetUrl, targetOptions);
                    return promise;
                }
            } else if (isArray === true) {
                Resource[action] = function (data) {
                    let {targetUrl, targetOptions} = route.setUrlParams(url, extend({}, data, extractParams(data, actionsPrams)), {
                        method: method,
                        headers: headers
                    });
                    let promise = new Promise((resolve, reject) => {
                        targetOptions.success = resp => {
                            let {code, data, message} = resp;
                            if (code == 200) {
                                if (Array.isArray(data))
                                    resolve([].concat(data.map(item=>new Resource(item))));
                                else
                                    reject("The api: [" + targetUrl + "] respond unexpected value");
                            } else {
                                reject(message || DEFAULT_ERROR_MESSAGE);
                            }
                        };
                        targetOptions.error = resp => {
                            if (isString(resp)) {
                                reject(resp);
                            } else {
                                reject(DEFAULT_ERROR_MESSAGE);
                            }
                        };
                    });
                    http(targetUrl, targetOptions);
                    return promise;
                }
            } else {
                Resource.prototype[action] = function (data) {
                    let {targetUrl, targetOptions} = route.setUrlParams(url,
                        extend(this.toJSON(), data, extractParams(extend(this.toJSON(), data), actionsPrams)),
                        {method: method, headers: headers}
                    );
                    this.$promises.push(new Promise((resolve, reject) => {
                        targetOptions.success = resp => {
                            let {code, data, message} = resp;
                            if (code == 200) {
                                resolve(Object.assign(this, data));
                            } else {
                                reject(message || DEFAULT_ERROR_MESSAGE);
                            }
                        };
                        targetOptions.error = resp => {
                            if (isString(resp)) {
                                reject(resp);
                            } else {
                                reject(DEFAULT_ERROR_MESSAGE);
                            }
                        };
                    }));
                    http(targetUrl, targetOptions);
                    return this;
                }
            }
        }

        return Resource;
    }
}
