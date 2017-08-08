const expect = require('expect');
const {isRealString} = require('./validation');




describe('Is real String', () => {
    it('should reject non-string values', () => {
        var value = isRealString(2);
        expect(value).toBeA('boolean');
        expect(value).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var value = isRealString("       ");
        expect(value).toBeA('boolean');
        expect(value).toBe(false);
    });

    it('should allow string with non-space charecters', () => {
        var value = isRealString("L.O.T.R");
        expect(value).toBeA('boolean');
        expect(value).toBe(true);
    });
}); 