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
import {BackOffPolicy} from "../BackOffPolicy";

export class FixedBackOffPolicy extends BackOffPolicy {
    constructor(period = 3000) {
        this.period = period;
    }

    start(executor) {
        
    }
}