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
  constructor(supportedMediaTypes = []) {
    this.supportedMediaTypes = supportedMediaTypes;
  }

  canRead(responseText, mediaType, xhr) {
    return this.supportedMediaTypes.indexOf(mediaType) !== -1;
  }

  canWrite(data, mediaType, xhr) {
    return this.supportedMediaTypes.indexOf(mediaType) !== -1;
  }

  read(responseText, xhr) {
    return responseText;
  }

  write(data, xhr) {
    return data;
  }
}
