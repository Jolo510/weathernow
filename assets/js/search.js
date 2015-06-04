function loadData() {
	var location = $('#location').val(); 
	var weatherUrl = '/weather?location=' + location; 

	$.getJSON(weatherUrl, function(data) {
		var resultObject = JSON.parse(data);	// location = {city, country, region}
												// condition = {code, date, temp, text} 
												// astronomy = {sunrise, sunset}
		//$('#test').text(resultObject[0].city); 
		$('#sunrise').text('Sunrise : ' + resultObject[2].sunrise);
		$('#place').text('City : ' + resultObject[0].city + ' Region: ' + resultObject[0].region); 
		$('#weather').text('Weather Condition : ' + resultObject[1].text + ' Temperature : ' + resultObject[1].temp); 
		$('#sunset').text('Sunset : ' + resultObject[2].sunset); 

	}).error(function(e) {
		alert("Couldn't load data"); 
	}); 
	
	// Terminating 
	return false; 
}; 

$("#form-container").submit(loadData); 