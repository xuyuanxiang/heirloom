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

export const warn = (expected, msg) => !!expected ? msg : console.warn(msg);
export const error = (expected, msg) => {
  if (!expected) {
    if (msg instanceof Error) {
      throw msg;
    } else if (typeof msg === 'string') {
      throw new Error(msg);
    }
  }
};

export const Assert = {warn, error};

