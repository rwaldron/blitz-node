/**
 * Responsable for requests to Blitz RESTful API
 */
(function () {
    var http = require('http'),
        api = {};

    api.client = function (user, apiKey, host, port) {
        function requestOptions () {
            return {
                host: host || 'blitz.io',
                port: port || 80,
                method: 'POST',
                headers: {
                    'X-API-User': user,
                    'X-API-Key': apiKey,
                    'X-API-Client' : 'node'
                }
            };
        }
        
        function responseHandler (response, callback) {
            // return error if not successful
            if( response.statusCode !== 200) {
                callback({
                    error: 'server', 
                    cause: response.statusCode
                });
                return;
            }
            // puts the data together
            var responseText = '';
            response.on('data', function (chunk) {
                responseText += chunk;
            });
            response.on('end', function () {
                // return error if no response from the server
                if (responseText === '') {
                    callback({
                        error: 'server', 
                        reason: 'No response'
                    });
                    return;
                }
                // return the data received
                callback(JSON.parse(responseText));
            });
        }

        return {
            execute: function (data, callback) {
                var request = null,
                    jsonData = JSON.stringify(data),
                    options = requestOptions();
                    
                options.path = '/api/1/curl/execute';
                options.headers['content-length'] = jsonData.length;
                request = http.request(options, function (response) {
                    responseHandler(response, callback);
                });
                // sends the data and closes the request
                request.write(jsonData);
                request.end();
            },
            login: function (callback) {
                var request = null,
                    options = requestOptions();
                options.path = '/login/api';
                options.method = 'GET';
                request = http.request(options, function (response) {
                    responseHandler(response, callback);
                });
                // closes the request
                request.end();
            },
            jobStatus: function (jobId, callback) {
                var request = null,
                    options = requestOptions();
                options.path = '/api/1/jobs/' + jobId + '/status';
                options.method = 'GET';
                request = http.request(options, function (response) {
                    responseHandler(response, callback);
                });
                // closes the request
                request.end();
            },
            abort: function (jobId, callback) {
                var request = null,
                    options = requestOptions();
                options.path = '/api/1/jobs/' + jobId + '/abort';
                options.method = 'PUT';
                request = http.request(options, function (response) {
                    responseHandler(response, callback);
                });
                // closes the request
                request.end('');
            }
        };
    }
    
    module.exports = api;
}());    
