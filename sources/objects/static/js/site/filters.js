/**
 * Beautify datetime, make it localized
 * @param {string} datetime
 * @returns {string}
 */
application.filter('getRelativeDateTime', ['$moment', function(moment) {
	return function (datetime) {
    	return moment(datetime).fromNow();
    }
}]);

/**
 * Display datetime in special format
 * D MMMM YYYY, dddd, HH:mm:ss
 * @param {string} datetime
 * @param {string} format
 * @returns {string}
 */
application.filter('getAbsoluteDateTime', ['$moment', function(moment) {
	return function (datetime, format) {
    	return moment(datetime).format(format || 'D MMMM YYYY, dddd, HH:mm:ss');
    }
}]);