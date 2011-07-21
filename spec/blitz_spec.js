var testServerPort = 9295,
    Blitz = require('../lib/blitz.js');

//needed by the mock server to compare usernames
process.env['BLITZ_API_USER'] = 'user';

describe("Blitz", function () {
    it("should return a Rush Result object", function () {
        var finished = false;
        runs (function() {
            Blitz('user', 'key', 'localhost', 9295)
                .rush({
                    user: 'c123', 
                    pattern: { intervals: []},
                    url: 'http://127.0.0.1'
                }, function (err, data) {
                expect(data.region).toBeDefined();
                expect(data.timeline).toBeDefined();
                finished = true;
            });
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should return a Sprint Result object", function () {
        var finished = false;
        runs (function() {
            Blitz('user', 'key', 'localhost', 9295)
                .sprint({url: 'http://127.0.0.1'}, function (err, data) {
                    expect(data.region).toBeDefined();
                    expect(data.duration).toBeDefined();
                    expect(data.connect).toBeDefined();
                    expect(data.request).toBeDefined();
                    expect(data.response).toBeDefined();
                    finished = true;
                });
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should fail Rush if pattern is not given", function () {
        var b = Blitz('user', 'key', 'localhost', 9295),
            finished = false;
        // run a sprint to authenticate
        runs (function () {
            b.sprint({url: 'http://127.0.0.1'}, function (err, data) {
                //now we can run a rush
                expect(function () {
                    b.rush({user: 'c123', url: 'http://127.0.0.1'}, function (err, data) {});  
                }).toThrow('missing pattern');
                finished = true;
            });
        });
        waitsFor (function() {
            return finished;
        });
    });
});
