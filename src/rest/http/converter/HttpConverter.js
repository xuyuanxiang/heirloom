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
export class HttpConverter {
  constructor({supportedMediatypes=[]}={}) {
    this.supportedMediatypes = supportedMediatypes;
  }

  canRead(responseText, mediaType) {
    return this.supportedMediatypes.indexOf(mediaType) !== -1;
  }

  canWrite(data, mediaType) {
    return this.supportedMediatypes.indexOf(mediaType) !== -1;
  }

  read(responseText) {
    return responseText;
  }

  write(data) {
    return data;
  }
}
