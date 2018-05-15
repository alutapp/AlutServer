//Information on how to use:
//https://www.npmjs.com/package/logger

var log = require('logger').createLogger('./logs/development.log'); // logs to a file

module.exports = {
	
	debug : function(str){
		console.log(str);
		log.debug(str);
	},

	warn : function(str){
		console.log(str);
		log.warn(str);
	},

	info : function(str){
		console.log(str);
		log.info(str);
	},

	error : function(str){
		console.log(str);
		log.error(str);
	},

	fatal : function(str){
		console.log(str);
		log.fatal(str);
	},

	setLevel : function(level){
		log.setLevel(level);
	},

	format : function(level, date, message) {
		log.format(level, date, message)
	}	

}