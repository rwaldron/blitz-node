var testServerPort = 9295,
    helper = require('../helper'),
    api = require('../../lib/blitz/api'),
    credentials = {username: 'user', apiKey: 'key'};

// set environment variable needed for the tests
process.env['BLITZ_API_USER'] = 'user';

// Test server. Will be handling the requests sent by the tests.
helper.mockServer.listen(testServerPort);

describe("API Client", function () {
    var client = api.client(credentials['username'], credentials['apiKey'],
        'localhost', testServerPort);

    describe("execute", function () {
        it("should receive ok on success", function () {
            var finished = false;
            runs (function() {
                client.execute({key:"value"}, function (result) {
                    expect(result).toBeDefined();
                    expect(result.ok).toBeTruthy(); 
                    finished = true;
                });
            });
            waitsFor(function () {
                return finished;
            });
        });
        
        it("should receive error on server failure", function () {
            var finished = false;
            runs (function() {
                client.execute({key:"value", timeout: 1000}, function (result) {
                    expect(result).toBeDefined();
                    expect(result.ok).toBeUndefined(); 
                    expect(result.error).toBeDefined(); 
                    expect(result.error).toEqual('server');
                    finished = true;
                });
            });
            waitsFor(function () {
                return finished;
            });
        });
    });
    
    describe("login", function () {
        afterEach (function () {
            // after our tests we set the env.var. to the expected values
            process.env['BLITZ_API_USER'] = 'user';
        });
        
        it("should return ok", function () {
            var finished = false;
            runs (function() {
                client.login(function (result) {
                    expect(result).toBeDefined();
                    expect(result.ok).toBeTruthy(); 
                    finished = true;
                });
            });
            waitsFor(function () {
                return finished;
            });
        });

        it("should return a API key", function () {
            var finished = false;
            runs (function() {
                client.login(function (result) {
                    expect(result).toBeDefined();
                    expect(result.api_key).toEqual('123');
                    finished = true;
                });
            });
            waitsFor(function () {
                return finished;
            });
        });
        
        it("should fail if user doesn't exists", function () {
            var finished = false;
            process.env['BLITZ_API_USER'] = 'user1';
            runs (function() {
                client.login(function (result) {
                    expect(result).toBeDefined();
                    expect(result.ok).toBeUndefined(); 
                    expect(result.error).toBeDefined(); 
                    expect(result.error).toEqual('login');
                    finished = true;
                });
            });
            waitsFor(function () {
                return finished;
            });
        });
    });
});


    
    