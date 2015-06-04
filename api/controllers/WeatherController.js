/**
 * WeatherController
 *
 * @description :: Server-side logic for managing weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `WeatherController.info()`
   */
  info: function (req, res) {
  	var YQL = require('yql'); 
  	// Getting location from url parameter
  	var location = req.param('location'); 

  	var queryStatement = 'select * from weather.forecast where (location =' + location +')'; 
  	// If queryStatement is incorrect, the program crashes.
  	// Need to handle when there is a bad query. User can enter a invalid location
	var query = new YQL(queryStatement);

  	query.exec(function(err, data) {
  		if (err) return res.json({message: 'Error loading weather information.'}); 

  		var location = data.query.results.channel.location;		// city, coutnry, region 
  		var condition = data.query.results.channel.item.condition;	// temp, text 
  		var astronomy = data.query.results.channel.astronomy;	// sunrise, sunset 

  		var result = [location, condition, astronomy]; 
  		result = JSON.stringify(result); 
  		return res.json(result); 
  	});
  }
};



