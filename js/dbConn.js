var db = null;   // db object

/* Create Database for Learner Logbook */
var shortName = "Learner Logbook";
var version = "1.0";
var displayName = "Logbook for Learner Driver in Victoria";
var maxSize = 5000; // bytes

/**
 *  function onError(err)
 */
var onError = function(err) {
	var str = "";
	switch(err.code)	{
		case	0:  str += "Non database error: " + err.message;
					break;
		case	1:	str += "Some database error: " + err.message;
					break;
		case	2:	str += "Wrong database version: " + err.message;
					break;
		case	3:	str += "Data set too large to return from query: " + err.message;
					break;
		case	4: 	str += "Storage limit exceeded: " + err.message;
					break;
		case	5:	str += "Lock contension error: " + err.message;
					break;
		case	6:	str += "Constraint failure: " + err.message;
					break;
		default	:	str += "Error: " + err.code + " " + err.message;
					break;
	}
	console.log(str);
}

var showLog = function(name) {
	console.log("Success: " + name);
}
