### ![blitz.io](http://blitz.io/images/logo2.png)

### Make load and performance a fun sport.

* Run a sprint from around the world
* Rush your API and website to scale it out
* Condition your site around the clock

## Getting started

Login to [blitz.io](http://blitz.io) and in the blitz bar type:
    
    --api-key

Now

    npm install blitz

Then

**Sprint**

```javascript
var Blitz = require('blitz');

console.log('Starting Sprint...');
Blitz('<email>','<api-key>').sprint({
    url: 'http://your.cool.ap',
    region: 'california'}, function (err, data) {
        if(err != null) {
            console.log(err);
            return;
        }
        console.log('status: ' + data.response.status);
        console.log('region: ' + data.region);
        console.log('duration: ' + data.duration);
        console.log('connect: ' + data.connect);
    });
```

**Rush**

```javascript
var Blitz = require('blitz');

console.log('Starting Rush...');
Blitz('<email>','<api-key>').rush({
    url: 'http://your.cool.ap',
    region: 'california',
    pattern: { intervals: [{start: 1, end: 10, duration: 30}]}
}, function (err, data) {
        if(err != null) {
            console.log(err);
            return;
        }
        console.log('timeline: [');
        var timeline = data.timeline;
        for(var i in timeline) {
            console.log('total: ' + timeline[i].total + ', errors: '+ timeline[i].errors);
        }
        console.log(']');
    });
```