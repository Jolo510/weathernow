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
  		if (err || data.query.results.channel.title == "Yahoo! Weather - Error") {
        // The err only returns if the zipcode entered is bad input. (i.e. contains letters) 
        // The data.query.results.channel.title checks if data is returned 
        var error = [{error: true}]; 
        error = JSON.stringify(error); 
        return res.json(error); 
      } else {
        var error = {error: false};  
      }
  		var location = data.query.results.channel.location;		// city, coutnry, region 
  		var condition = data.query.results.channel.item.condition;	// temp, text 
  		var astronomy = data.query.results.channel.astronomy;	// sunrise, sunset 
      var forecast = data.query.results.channel.item.forecast[0]; 

  		var result = [error, location, condition, astronomy, forecast]; 
  		result = JSON.stringify(result);  
  		return res.json(result); 
  	});
  }
};



