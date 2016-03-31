var request = require('request-promise');

function getExperimentInfo(id) {
	var url = 'https://www.google-analytics.com/cx/api.js?experiment='+id;
	return request(url).then(function(text) {
		var info = /experiments_=(.*?);\w+\.DEFAULT_ID=/m.exec(text)[1];
		return JSON.parse(info)[id];
	});
}

function patch(source, experimentsInfo) {
	return source.replace(/experiments_=(.*?);(\w+)\.DEFAULT_ID=/m, function(match, info, name) {
		return 'experiments_=' + JSON.stringify(experimentsInfo) +
			';' + name + '.DEFAULT_ID=';
	});
}

function bundle(experimentIds) {
	if (typeof experimentIds === 'string') {
		experimentIds = [experimentIds];
	}
	return request('https://www.google-analytics.com/cx/api.js').then(function(source) {
		var promises = experimentIds.map(getExperimentInfo);
		return Promise.all(promises).then(function(infos) {
			var experimentsInfo = {};
			infos.forEach(function(info, index){
				experimentsInfo[experimentIds[index]] = info;
			});
			return patch(source, experimentsInfo);
		});
	});
}

module.exports = bundle;
