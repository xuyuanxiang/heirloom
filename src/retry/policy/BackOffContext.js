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
export class BackOffContext {

    static caches = [];

    constructor(parent) {
        while (BackOffContext.caches.length > 3) {

        }
        BackOffContext.caches.push(this);
    }

    getLastContext() {
        
    }

    getLastErrors() {
        return null;
    }

}