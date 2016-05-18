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
const SERIES = {
  1: 'INFORMATIONAL',
  SUCCESSFUL: 2,
  REDIRECTION: 3,
  CLIENT_ERROR: 4,
  SERVER_ERROR: 5
};

export class HttpStatus {
  static Series = SERIES;

  constructor(status) {
    status = (Number(status) / 100).toFixed();
    for (let key of Object.keys(SERIES)) {
      if (SERIES[key] == status) {
        this.series = key;
        break;
      }
    }
  }
}
