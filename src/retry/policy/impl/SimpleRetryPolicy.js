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
import {RetryPolicy} from "../RetryPolicy";
import {SimpleRetryContext} from "./SimpleRetryContext";

class SimpleRetryPolicy extends RetryPolicy {
    constructor({maxAttempts=3} = {}) {
        this.maxAttempts = maxAttempts;
    }

    canRetry(context = new SimpleRetryContext()) {
        return super.canRetry(context) && context.retryCount <= this.maxAttempts;
    }
}