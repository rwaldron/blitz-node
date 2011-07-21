(function () {
    
    function Validate(json) {
        
        function url (url) {
            var expected = /^\w{3,6}:\/\/([\w-_]+\.)+[\w]{1,3}/gi
            return url != null && expected.test(url);
        }
        
        function integer(num) {
            var expected = /^\d+$/g
            return num != null && expected.test(num.toString(10));
        }
        
        function notEmpty(str) {
            return str != null && str.length > 0;
        }
        
        function array(array) {
            return array != null && Object.prototype.toString.apply(array) === '[object Array]';
        }
        
        function number(num) {
            return num != null && Object.prototype.toString.apply(num) === '[object Number]';
        }
        
        var failed =[];
        if(!url(json.url)) {
            failed.push('url');
        }
        if(typeof json.cookies !== 'undefined' && !array(json.cookies)) {
            failed.push('cookies');
        }
        if (typeof json.referer !== 'undefined'  && !url(json.referer)) {
            failed.push('referer');
        }
        if (typeof json.headers !== 'undefined' && !array(json.headers)) {
            failed.push('headers');
        }
        if(typeof json.content !== 'undefined' && !json.content.data) {
            failed.push('content');
        }
        if(typeof json.pattern !== 'undefined' && !array(json.pattern.intervals)) {
            failed.push('pattern');
        }
        if(typeof json.status !== 'undefined' && !number(json.status) && !integer(json.status)) {
            failed.push('status');
        }
        if(typeof json.timeout !== 'undefined' && !number(json.timeout) && !integer(json.timeout)) {
            failed.push('timeout');
        }
        if(typeof json.user !== 'undefined' && !notEmpty(json.user)) {
            failed.push('user');
        }
        if(typeof json.region !== 'undefined' && !notEmpty(json.region)) {
            failed.push('region');
        }
        if(typeof json.ssl !== 'undefined' && !notEmpty(json.ssl)) {
            failed.push('ssl');
        }
        return {
            valid: function () {
                return failed.length === 0;
            },
            result: function () {
                if(failed.length === 0) {
                    return null;
                }
                return {
                    error: 'validation',
                    reason: 'invalid JSON attributes',
                    attributes: failed
                };
            }
            
        };
    }

    module.exports = Validate;
}());


