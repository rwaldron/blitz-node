var http = require('http'),
    mockServer = null,
    status = {
        _id: 'a123',
        ok: true,
        result: {
            region: 'california',
            duration: 10,
            connect: 1,
            request: {
                line: 'GET / HTTP/1.1',
                method: 'GET',
                url: 'http://localhost:9295',
                headers: {},
                content: new Buffer('content', 'utf8').toString('base64')
            },
            response: {
                line: 'GET / HTTP/1.1',
                message: 'message',
                status: 200,
                headers: {},
                content: new Buffer('content', 'utf8').toString('base64')
            }
        }
    },
    timeline = {
        _id: 'c123',
        ok: true,
        result: {
            region: 'california',
            timeline: [
                { duration: 1, total: 10, hits: 8, errors: 1, timeouts: 1, volume: 10},
                { duration: 2, total: 100, hits: 80, errors: 10, timeouts: 10, volume: 100}
            ]
        }        
    };

module.exports.mockServer = http.createServer(function (request, response) {
    if (request.url === '/api/1/curl/execute') {
        var data = '';
        request.addListener('data', function(chunk) { data += chunk; });
        request.addListener('end', function() {
            var parsedData = JSON.parse(data);
            if (parsedData.timeout) {
                response.writeHead(404);
            }
            else {
                var id = 'a123';
                if (parsedData.user) {
                    id = parsedData.user;
                }
                response.writeHead(200, {'content-type': 'application/json'});
                response.write(JSON.stringify({ok: true, job_id: id}));
            }
            response.end();
        });        
    }
    else if (request.url === '/login/api') {
        response.writeHead(200, {'content-type': 'application/json' });
        if(request.headers['x-api-user'] === process.env['BLITZ_API_USER'] &&
            request.headers['x-api-key'] === 'key') {
            
            response.end(JSON.stringify({ok: true, api_key: '123'}));
        }
        else {
            response.end(JSON.stringify({error: 'login', reason: 'test'}));
        }
    }
    else if (request.url === '/api/1/jobs/a123/status') {
        status.status = 'completed';
        response.writeHead(200, {'content-type': 'application/json' });
        response.end(JSON.stringify(status));
    }
    else if (request.url === '/api/1/jobs/b123/status') {
        status._id = 'b123';
        status.status = 'running';
        response.writeHead(200, {'content-type': 'application/json' });
        response.end(JSON.stringify(status));
    }
    else if (request.url === '/api/1/jobs/c123/status') {
        timeline.status = 'completed';
        response.writeHead(200, {'content-type': 'application/json' });
        response.end(JSON.stringify(timeline));
    }
    response.writeHead(404);
});


