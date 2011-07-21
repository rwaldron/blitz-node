(function() {

    var api = require('./api'),
        Validate = require('./validate'),
        sprint = {};
    
    /**
     * Snapshot of a rush at time[i] containing information about hits, errors,
     * timeouts, etc.
     */
    function Point(json) {
        return {
            timestamp: json['timestamp'], 
            duration: json['duration'],
            total: json['total'],
            hits: json['hits'],
            errors: json['errors'],
            timeouts: json['timeouts'] ,
            volume: json['volume'],
            txbytes: json['txbytes'],
            rxbytes: json['rxbytes']
        };
    }

    /**
     * Result of the rush
     */
    function Result(json) {
        var result = json['result'],
            timeline = result['timeline'].map(function(item) {
                return Point(item);
            });
        return {
            region: result['region'],  
            timeline: timeline
        };
    }

    /**
     * Responsable for the Sprints. Uses api.client to make the requests and return a
     * formatted Sprint response
     */
    sprint.create = function (credentials, options, callback) {
        var user = credentials.username,
            pass = credentials.apiKey,
            host = credentials.host,
            port = credentials.port,
            client = api.client(user, pass, host, port);
        return {
            execute: function () {
                var attributes = Validate(options);
                if (!attributes.valid()) {
                    throw attributes.result();
                }
                else if (!options.pattern) {
                    throw 'missing pattern';
                }
                else {
                    client.execute(options, function (queueResponse) {
                        if (queueResponse.ok) {
                            var jobId = queueResponse.job_id,
                                intervalId = setInterval(function () {
                                    client.jobStatus(jobId, function (job) {
                                        var result = job.result;
                                        if (job.status === 'queued' || 
                                                (job.status === 'running' && !result)) {
                                            // if waiting or still running, wait 2 secs.    
                                            return;
                                        }
                                        else if (result && result.error) {
                                            // return an error if got an error from the escale engine
                                            callback(result.error, result);
                                            return;
                                        }
                                        else if (job.error) {
                                            // return an error if got an error from the server
                                            callback(job.error, result);
                                            return;
                                        }
                                        else if (!result) {
                                            // got here without any errors and result?
                                            throw "No Result";
                                        }
                                        if (job.status === 'completed') {
                                            // if we got here we can clear the interval
                                            clearInterval(intervalId);
                                        }
                                        // we finally call the callback
                                        callback(null, Result(job));
                                    });
                                }, 2000);
                        }
                        else {
                            callback(queueResponse.error, queueResponse);
                        }
                    });
                }
            },
            abort: function () {
                client.abort(jobId, function (response) {
                    if(response.error) {
                        callback(response.error, response);
                        return;
                    }
                    callback(null, JSON.stringify({ok:true}));
                });
            }
        };
    }
    
    module.exports = sprint;
}());