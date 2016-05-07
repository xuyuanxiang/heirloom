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
import {forEach, isObject, copy, isString, isDefined} from "../common/util"
const PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/;

const parseArgs = args => {
        let url, params, options;
        switch (args.length) {
            case 1:
                if (isObject(args[0])) {
                    params = copy(args[0]);
                } else if (isString(args[0])) {
                    url = args[0];
                }
                break;
            case 2:
                url = args[0];
                params = copy(args[1]);
                break;
            case 3:
                url = args[0];
                params = copy(args[1]);
                options = copy(args[2]);
                break;
        }
        return {url, params, options};
    }
    , encodeUriQuery = (val, pctEncodeSpaces) => encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'))
    , encodeUriSegment = val => encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+')
    ;

export class Route {
    constructor(template) {
        this.template = template;
        this.urlParams = {};
    }

    /**
     * case 1:
     *  `setUrlParams(url)` or `setUrlParams(params)`
     * case 2:
     *  `setUrlParams(url, params)`
     * case 3:
     *  `setUrlParams(url, params, options)`
     *
     * @param url {string} URL Tempalte e.g. http://url.com/api/users/:id  or http://url.com/api/users
     * @param params {object}  Request parameters
     * @params options {object} !!see xhr.js, `request` method's argument: options
     *
     * @returns {{targetUrl: string, targetOptions: {data: {}}}}
     */
    setUrlParams() {
        let self = this,
            val,
            encodedVal,
            protocolAndDomain = '',
            urlParams = self.urlParams = {},
            {url, params, options} = parseArgs(arguments);

        url = url || self.template;
        forEach(url.split(/\W/), function (param) {
            if (param === 'hasOwnProperty') {
                throw new Error("Illegal argument: 'hasOwnProperty' is not a valid parameter name.");
            }
            if (!(new RegExp("^\\d+$").test(param)) && param &&
                (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                urlParams[param] = {
                    isQueryParamValue: (new RegExp("\\?.*=:" + param + "(?:\\W|$)")).test(url)
                };
            }
        });
        url = url.replace(/\\:/g, ':');
        url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function (match) {
            protocolAndDomain = match;
            return '';
        });

        params = isObject(options) && isObject(options.data) ? Object.assign(params, options.data) : params;
        Object.keys(self.urlParams).forEach(urlParam => {
            let paramInfo = self.urlParams[urlParam];
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : undefined;
            if (isDefined(val) && val !== null) {
                if (paramInfo.isQueryParamValue) {
                    encodedVal = encodeUriQuery(val, true);
                } else {
                    encodedVal = encodeUriSegment(val);
                }
                url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function (match, p1) {
                    return encodedVal + p1;
                });
            } else {
                url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function (match,
                                                                                              leadingSlashes, tail) {
                    if (tail.charAt(0) == '/') {
                        return tail;
                    } else {
                        return leadingSlashes + tail;
                    }
                });
            }
        });

        // strip trailing slashes and set the url
        url = url.replace(/\/+$/, '') || '/';

        // then replace collapse `/.` if found in the last URL path segment before the query
        // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
        url = url.replace(/\/\.(?=\w+($|\?))/, '.');

        // set url for `request` method in xhr.js
        // replace escaped `/\.` with `/.`
        let targetUrl = protocolAndDomain + url.replace(/\/\\\./, '/.');

        // set options for `request` method' in xhr.js
        // set extra params not in url template to options.data property
        let targetOptions = isObject(options) ? Object.assign({data: {}}, options) : {data: {}};
        Object.keys(params).forEach(key => {
            let value = params[key];
            if (!self.urlParams[key]) {
                targetOptions.data[key] = value;
            }
        });
        return {targetUrl, targetOptions};
    }
}

