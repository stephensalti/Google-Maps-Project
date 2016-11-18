var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map') , {
     	center: {lat: 41.0819319, lng: -74.175816},
         zoom: 9
    });
}
$("document").ready(function() { //following javascript won't execute until page is done loading
	$("#add").on("click", function() {
		var input = $("#Address").val();
		var jax = $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=?" + input); //this will request the lat and long of whatever user types in and outputs it in JSON 
		//the address part of the url has the user's input appended to it
		var json_lat_long;
		jax.done(function(data) { //when json request is done...
			json_lat_long = data.results[0].geometry.location; //results[0] gives first result from address search
			var marker = new google.maps.Marker({
				position: json_lat_long, //position excepts two properties: lat, and lng
				map: map,
				title: data.results[0].formatted_address //tooltip will be attached to marker that showing address
			});
		//Will now Add the address user typed as list element and attach lat and long as data
		var li = $("<li> </li>").append($("#Address").val());
		$(li).data("lat", json_lat_long.lat);
		$(li).data("lng", json_lat_long.lng);
		$("#addresses").append(li);
		$("#Address").val(""); //Clearing Text Box
		}); //end of $("#add").on scope
	
	});
	//When an li element is clicked, center on that address...
	$("ul").on("click", "li", function() { // "li" included to make it a delegated handler
		var Lat = $(event.target).data("lat"); //gets data from li element that was clicked
		var Lng = $(event.target).data("lng"); //NOTE: Need to retrieve one property at a time, getting whole obj wasn't working for some reason
		map.setCenter({lat: Lat, lng: Lng});
	}); 

	//Just styling list elements so they change color when hovered over
	//Was going to use .hover method but can't seem to turn it into a delegated handler
	$("ul").on("mouseenter", "li", function() { //delegated handler
		$(this).css("background-color", "#9eff9e");
		$(this).css("border-color", "#69b768");
	});
	$("ul").on("mouseleave", "li", function() {
		$(this).css("background-color", "#c4c4c4");
		$(this).css("border-color", "#9e9e9e");
	});
});
