(function () {

    var api = require('./blitz/api'),
        sprint = require('./blitz/sprint'),
        rush = require('./blitz/rush');
        
    function Blitz (username, apiKey, host, port) {
        var authenticated = false,
            credentials = {
            username: username,
            apiKey: apiKey,
            host: host,
            port: port
        }; 
        
        function run(options, callback, module) {
            if(authenticated) {
                module.create(credentials, options, callback).execute();
            }
            else {
                var client = api.client(username, apiKey, host, port);
                client.login(function(result) {
                    if (result.ok) {
                        authenticated = true;
                        credentials.apiKey = result.api_key;
                        module.create(credentials, options, callback).execute();
                    }
                    else {
                        callback(result.error, result);
                    }
                });
            }
        }
        
        return {
            rush: function (options, callback) {
                run(options, callback, rush);
            },
            sprint: function(options, callback) {
                run(options, callback, sprint);
            },
            client: api.client
        };
    }
    
    module.exports = Blitz;
}());


