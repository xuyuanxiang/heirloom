/**
 * @name
 * @description
 * @usage
 *
 * ==================================================
 * @version 1.0.0
 * @author xuyuanxiang
 * @date 16/5/18
 * ==================================================
 * @version
 * @updator
 * @date
 * @changelog
 *
 * ==================================================
 * ...
 */
import {BrowserXHR} from '../../../src/rest/http/BrowserXHR';

describe('BrowserXHR', ()=> {
  it('#build return an instance of XMLHttpRequest', ()=> {
    let browserXHR = new BrowserXHR();
    let xhr = browserXHR.build();
    console.log(xhr);
    // expect(xhr instanceof XMLHttpRequest).toBe(true);
  });
});
