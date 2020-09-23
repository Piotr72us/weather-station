// JS code
var city = "chicago";

var searchPan = $("#searchCityBtnPlace");

var descriptions = [];

var lat;
var lon;

var poiId = [];
var imgId = [];
var anotherId = [];

const imgObj = {}
const imgObj2 = {}

var placeName = [];
var address = [];
var country = [];
var rank = [];

var openAPI = "af6923e95cbb6c53be8ceb07c2b776e5"
var tomAPI = "OkYURWQKTdRDcXG4k3GCeRVkW173Dfxk"

function weatherSearch (city2) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city2 + "&units=imperial&appid=" + openAPI;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        
        tom1(lat, lon);
    });
}


// Show TomTom Tourist Attractions
function tom1 (lat, lon) {
    var queryURL = "https://api.tomtom.com/search/2/search/important%20tourist%20attraction.json?key=" + tomAPI + "&lat=" + lat + "&lon=" + lon + "&idxSet=POI";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //make an array of POIs which possess "dataSources" = images
        for (var i = 0; i < response.results.length; i++) {

        if (response.results[i].dataSources !== undefined) {

            poiId.push(response.results[i].dataSources.poiDetails[0].id);

            placeName.push(response.results[i].poi.name);
            address.push(response.results[i].address.freeformAddress);
            country.push(response.results[i].address.country);
            rank.push(response.results[i].score.toFixed(1));

        }

    }   
    tom2(poiId);
    });   
}

// get POI details and images after you know POI's ID
function tom2 (poiId) {

    for (i = 0; i < poiId.length; i++) {
    var queryURL = "https://api.tomtom.com/search/2/poiDetails.json?key=" + tomAPI + "&id=" + poiId[i];

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // descriptions.push(response.result.description);

        // console.log(descriptions);
        imgObj[response.id] = response.result.photos[0].id
        imgObj2[response.id] = response.result.description
        
        imgId.push(response.result.photos[0].id);
        anotherId.push(response.result.description);

        callme(imgObj, imgObj2);
        console.log(anotherId);

    });
    } 
    
}
console.log(anotherId);
// console.log(descriptions);
function callme(imgObj, imgObj2) {
    // console.log(imgObj);
    console.log(imgObj2);
    // console.log(descriptions);

    for (var i = 0; i < 15; i++) {
        
        $("#imx" + i).attr("src", "https://api.tomtom.com/search/2/poiPhoto?key=OkYURWQKTdRDcXG4k3GCeRVkW173Dfxk&id=" + imgObj[poiId[i]]);

        $("#hel" + i).text(placeName[i]);
        $("#par" + i).text(address[i]);
        var ctry = $("<p>").text(country[i]);
        var rnk = $("<p>").text("Our verdict: " + rank[i] + " out of 10 stars!");
        $("#par" + i).text(address[i]).append(ctry).append(rnk)
    }

    for (var i = 0; i < 15; i++) {
        

        var deb = $("<p>").text(imgObj2[poiId[i]]);
        $("#par" + i).append(deb);
    }
}


$(searchPan).on('click', function(event){
    event.preventDefault();
    var city2 = $('#cityInput2').val();
    weatherSearch(city2);

});