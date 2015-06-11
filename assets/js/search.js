function loadData() {
	var location = $('#location').val();
	var locationBottom = $('#locationBottom').val();  
	if (location === '') {
		var weatherUrl = '/weather?location=' + locationBottom; 
	} else {
		var weatherUrl = '/weather?location=' + location; 
	}
	
	$("#searchTop")[0].reset(); 
	$("#searchBottom")[0].reset(); 
	$.getJSON(weatherUrl, function(data) {
		var resultObject = JSON.parse(data);	// location = {city, country, region}
												// condition = {code, date, temp, text} 
												// astronomy = {sunrise, sunset}
												// forecast = {code, date, day, high, low, text}
		if (resultObject[0].error == false) {
			// Removes error class if there was a previous error
			if ($("#searchTop").hasClass("has-error") || $("#searchBottom").hasClass("has-error") ) {
				$("#searchTop").removeClass("has-error");
				$("#searchBottom").removeClass("has-error");
			} 

			$('#sunrise').text(resultObject[3].sunrise);
			$('#place').text(resultObject[1].city + ', ' + resultObject[1].region); 
			$('#weather').text(resultObject[2].text); 
			$('#temperature').text(resultObject[2].temp);
			$('#sunset').text(resultObject[3].sunset); 
			$('#high').text(resultObject[4].high);
			$('#low').text(resultObject[4].low); 
		} else {
			// Adds error class to the form when an error occurs 
			$("#searchTop").addClass("has-error");
			$("#searchBottom").addClass("has-error");
		}

	}).error(function(e) {
		alert("Couldn't load data"); 
	}); 
	

	// Terminating 
	return false; 
}; 

$("#searchTop").submit(loadData); 
$("#searchBottom").submit(loadData); 

function equalHeight(group) {    
    var tallest = 0;    
    group.each(function() {       
        var thisHeight = $(this).height();       
        if(thisHeight > tallest) {          
            tallest = thisHeight;       
        }    
    });    
    group.each(function() { $(this).height(tallest); });
} 

$(document).ready(function() {   
    equalHeight($(".thumbnail")); 
});