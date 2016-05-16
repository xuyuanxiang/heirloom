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
jest.unmock('../../src/rest/http');
import {HTTP} from "../../src/rest/http/Http";

describe('HTTP', ()=> {

    it('#request', ()=> {
        let http = new HTTP();
        expect(true).toBe(true);
    });

});
