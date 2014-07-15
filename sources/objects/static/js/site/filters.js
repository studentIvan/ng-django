/**
 * Beautify datetime, make it localized
 * @param {string} datetime
 * @returns {string}
 */
application.filter('getRelativeDateTime', function() {
	return function (datetime) {
    	return application.moment(datetime).fromNow();
    }
});

/**
 * Display datetime in special format
 * D MMMM YYYY, dddd, HH:mm:ss
 * @param {string} datetime
 * @returns {string}
 */
 application.filter('getAbsoluteDateTime', function() {
	return function (datetime) {
    	return application.moment(datetime).format('D MMMM YYYY, dddd, HH:mm:ss');
    }
});