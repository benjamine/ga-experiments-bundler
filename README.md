ga-experiments-bundler
======================

Pack multiple Google Experiments in 1 bundle.

It downloads `/www.google-analytics.com/cx/api.js?experiment=YOUR_EXPERIMENT_ID` for each experiment id to pack them all in 1 file.

Usage
-----

### CLI
``` sh
ga-experiments-bundler nY2RGW2IQcWuvbYca51vhg ZWQgYW5kIHRyYW5zZmVyca UlNRSBjb250ZW50IHRyeHR > cxapi.js
```

### API

``` js
var bundler = require('ga-experiments-bundler');

bundler.bundle([
	'nY2RGW2IQcWuvbYca51vhg'
	'ZWQgYW5kIHRyYW5zZmVyca'
	'UlNRSBjb250ZW50IHRyeHR'
]).then(function(js){
	fs.writeFileSync('cxapi.js', js);
});

```
