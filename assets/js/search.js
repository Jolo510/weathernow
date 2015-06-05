function loadData() {
	var location = $('#location').val(); 
	var weatherUrl = '/weather?location=' + location; 
	$("#form-container")[0].reset(); 
	$.getJSON(weatherUrl, function(data) {
		var resultObject = JSON.parse(data);	// location = {city, country, region}
												// condition = {code, date, temp, text} 
												// astronomy = {sunrise, sunset}
		$('#sunrise').text('Sunrise : ' + resultObject[2].sunrise);
		$('#place').text(resultObject[0].city + ' ' + resultObject[0].region); 
		$('#weather').text('Weather Condition ' + resultObject[1].text); 
		$('#temperature').text('Temperature ' + + resultObject[1].temp + ' F')
		$('#sunset').text('Sunset : ' + resultObject[2].sunset); 

	}).error(function(e) {
		alert("Couldn't load data"); 
	}); 
	
	// Terminating 
	return false; 
}; 

$("#form-container").submit(loadData); 