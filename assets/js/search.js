function loadData() {
	var location = $('#location').val(); 
	var weatherUrl = '/weather?location=' + location; 
	$("#form-container")[0].reset(); 
	$.getJSON(weatherUrl, function(data) {
		var resultObject = JSON.parse(data);	// location = {city, country, region}
												// condition = {code, date, temp, text} 
												// astronomy = {sunrise, sunset}
		if (resultObject[0].error == false) {
			$('#sunrise').text('Sunrise : ' + resultObject[3].sunrise);
			$('#place').text(resultObject[1].city + ' ' + resultObject[1].region); 
			$('#weather').text('Weather Condition ' + resultObject[2].text); 
			$('#temperature').text('Temperature ' + + resultObject[2].temp + ' F')
			$('#sunset').text('Sunset : ' + resultObject[3].sunset); 
		} else {
			// Write code to display error 
			alert("Invalid Zip Code/Postal Code"); 
		}

	}).error(function(e) {
		alert("Couldn't load data"); 
	}); 
	
	// Terminating 
	return false; 
}; 

$("#form-container").submit(loadData); 