# Use

## Sprint

```javascript
var Blitz = require('../blitz-node/lib/blitz.js');

console.log('Starting Sprint...');
Blitz('gui.hermeto@gmail.com','dalfgxdu-rhakfb1a-aae3se7y-5eqw4gci').sprint({
    url: 'http://ghermeto-sinatratest.heroku.com',
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

## Rush

```javascript
var Blitz = require('../blitz-node/lib/blitz.js');

console.log('Starting Rush...');
Blitz('gui.hermeto@gmail.com','dalfgxdu-rhakfb1a-aae3se7y-5eqw4gci').rush({
    url: 'http://ghermeto-sinatratest.heroku.com',
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