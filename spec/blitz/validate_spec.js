var testServerPort = 9295,
    Validate = require('../../lib/blitz/validate');

describe("Validate", function () {
    it("should validate a hash with a IP address", function () {
        var json = { url: 'http://172.0.0.1'},
            hash = Validate(json);
            
        expect(hash.valid()).toBeTruthy();
        expect(hash.result()).toBeNull();
    });

    it("should validate a hash with a hostname", function () {
        var json = { url: 'http://blitz.io'},
            hash = Validate(json);
            
        expect(hash.valid()).toBeTruthy();
        expect(hash.result()).toBeNull();
    });

    it("should validate a hash with a hostname and a path", function () {
        var json = { url: 'http://blitz.io/play'},
            hash = Validate(json);
            
        expect(hash.valid()).toBeTruthy();
        expect(hash.result()).toBeNull();
    });

    it("should fail validation with no url", function () {
        var json = {},
            hash = Validate(json),
            result = hash.result();
            
        expect(hash.valid()).toBeFalsy();
        expect(result.error).toEqual('validation');
    });

    it("should fail validation with a bogus url", function () {
        var json = { url: '12abs'},
            hash = Validate(json),
            result = hash.result();
            
        expect(hash.valid()).toBeFalsy();
        expect(result.error).toEqual('validation');
    });

    it("should validate with a cookies array", function () {
        var json = { url: 'http://172.0.0.1', cookies: []},
            hash = Validate(json);
            
        expect(hash.valid()).toBeTruthy();
        expect(hash.result()).toBeNull();
    });

    it("should fail validation with a cookie object", function () {
        var json = { url: 'http://172.0.0.1', cookies: {}},
            hash = Validate(json),
            result = hash.result();
            
        expect(hash.valid()).toBeFalsy();
        expect(result.error).toEqual('validation');
    });

    it("should validate with a status number", function () {
        var json = { url: 'http://172.0.0.1', status: 200},
            hash = Validate(json);
            
        expect(hash.valid()).toBeTruthy();
        expect(hash.result()).toBeNull();
    });

    it("should fail validation with a status string", function () {
        var json = { url: 'http://172.0.0.1', status: "abc"},
            hash = Validate(json),
            result = hash.result();
            
        expect(hash.valid()).toBeFalsy();
        expect(result.error).toEqual('validation');
    });

    it("should fail validation with an empty region", function () {
        var json = { url: 'http://172.0.0.1', region: ""},
            hash = Validate(json),
            result = hash.result();
            
        expect(hash.valid()).toBeFalsy();
        expect(result.error).toEqual('validation');
    });
});
