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
// jest.unmock('../../src/rest/http');
import {Http} from "../../src/rest/http/Http";

describe('HTTP', ()=> {

  it('#request', ()=> {
    let http = new Http();
    expect(true).toBe(true);
  });

});
