var testServerPort = 9295,
    sprint = require('../../lib/blitz/sprint'),
    credentials = {username: 'user', apiKey: 'key', host: 'localhost', port: 9295};

describe("Sprint", function () {
    it("should have a Result object", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                expect(data.region).toBeDefined();
                expect(data.duration).toBeDefined();
                expect(data.connect).toBeDefined();
                expect(data.request).toBeDefined();
                expect(data.response).toBeDefined();
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should have a Request object inside Result", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                var request = data.request;
                expect(request.line).toBeDefined();
                expect(request.method).toBeDefined();
                expect(request.url).toBeDefined();
                expect(request.headers).toBeDefined();
                expect(request.content).toBeDefined();
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should have a Response object inside Result", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                var response = data.response;
                expect(response.line).toBeDefined();
                expect(response.message).toBeDefined();
                expect(response.status).toBeDefined();
                expect(response.headers).toBeDefined();
                expect(response.content).toBeDefined();
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should match the expected Result data", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                expect(data.region).toEqual('california');
                expect(data.duration).toEqual(10);
                expect(data.connect).toEqual(1);
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should match the expected Request data", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                var request = data.request;
                expect(request.method).toEqual('GET');
                expect(request.url).toEqual('http://localhost:9295');
                expect(request.content).toEqual('content');
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });

    it("should match the expected Response data", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {url: 'http://127.0.0.1'}, function (err, data) {
                var response = data.response;
                expect(response.message).toEqual('message');
                expect(response.status).toEqual(200);
                expect(response.content).toEqual('content');
                finished = true;
            }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });
    
    it("should receive the result while running", function () {
        var finished = false;
        runs (function() {
            sprint.create(credentials, {user: 'b123', url: 'http://127.0.0.1'}, 
                function (err, data) {
                    var response = data.response;
                    expect(response.status).toEqual(200);
                    finished = true;
                }).execute();
        });
        waitsFor(function () {
            return finished;
        });
    });
});
