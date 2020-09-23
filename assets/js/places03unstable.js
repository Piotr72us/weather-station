// VERSION 03


// JS code
// var city = "chicago";

var searchPan = $("#searchCityBtnPlace");

var lat;
var lon;

var descriptions = [];

var poiId = [];
var imgId = [];
var anotherId = [];

var placeName = [];
var address = [];
var country = [];
var rank = [];

var revTxt = [];
var realRat = [];
var check = [];

const imgObj = {}
const imgObj2 = {}
const imgObjReviews = {}
const imgObjReviewsDate = {}
const imgObjRatings = {}


var openAPI = "af6923e95cbb6c53be8ceb07c2b776e5"
var tomAPI = "OkYURWQKTdRDcXG4k3GCeRVkW173Dfxk"

var touristAtt = "important%20tourist%20attraction"

function weatherSearch2 (city2) {
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
    var queryURL = "https://api.tomtom.com/search/2/search/important%20tourist%20attraction.json?key=" + tomAPI + "&lat=" + lat + "&lon=" + lon + "&idxSet=POI&limit=11";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        // var check = [];
        //make an array of POIs which possess "dataSources" = images
        for (var i = 0; i < response.results.length; i++) {

            if (response.results[i].dataSources !== undefined) {

                console.log(response.results[i].dataSources)

                poiId.push(response.results[i].dataSources.poiDetails[0].id);

                placeName.push(response.results[i].poi.name);
                address.push(response.results[i].address.freeformAddress);
                country.push(response.results[i].address.country);
                rank.push(response.results[i].score.toFixed(0));
                check.push(response.results[i].dataSources);
            }
        } 
        
        if (check.length < 1) {
            alert("Sorry, we didn't find anything interesting! Please try another city")
        }
        else if (check.length < 4 && check.length > 0) {
            alert("We're still improving our database. Come back soon to see more!")
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
        // console.log(response);

        // console.log(descriptions);
        imgObj[response.id] = response.result.photos[0].id
        imgObj2[response.id] = response.result.description
        imgObjReviews[response.id] = response.result.reviews[0].text
        // imgObjReviewsDate[response.id] = response.result.reviews[0].date
        imgObjRatings[response.id] = response.result.rating.value
        
        imgId.push(response.result.photos[0].id);
        anotherId.push(response.result.description);
        revTxt.push(response.result.reviews[0].text);
        realRat.push(response.result.rating.value);

        callme(imgObj, imgObj2);
        // console.log(anotherId);
    });
    } 
    
}
// console.log(anotherId);
// console.log(descriptions);
function callme(imgObj, imgObj2) {
    // console.log(imgObj);
    // console.log(imgObj2);
    // console.log(descriptions);

    for (var i = 0; i < imgId.length; i++) {
        var deb = $("<p>").text(imgObj2[poiId[i]]);
        var ctry = $("<p>").text(country[i]);
        // if (imgObj[poiId[i]] !== undefined) {
        $("#imx" + i).attr("src", "https://api.tomtom.com/search/2/poiPhoto?key=OkYURWQKTdRDcXG4k3GCeRVkW173Dfxk&id=" + imgObj[poiId[i]]);
        // }

        $("#hel" + i).text(placeName[i]);
        $("#par" + i).text(address[i]).append(ctry).append(deb);

        // if (rank[i] !== undefined) {
        // $("#ran" + i).text("Our verdict: " + rank[i] + " out of 10 stars!");
        // $("#rev" + i).text("Top review: " + imgObjReviews[poiId[i]]);
        // $("#rats" + i).text("Average score: " + imgObjRatings[poiId[i]])
        // }
        // $("#rev" + i).text("Top review: " + imgObjReviews[poiId[i]]);
        
    }

    // for (var i = 0; i < revTxt.length; i++) {
    //         $("#rev" + i).text("Top review: " + imgObjReviews[poiId[i]]);
    // }

    // for (var i = 0; i < imgId.length; i++) {
        
    //     var deb = $("<p>").text(imgObj2[poiId[i]]);
    //     // var realRating = $("<p>").text("Average rating: " + imgObjRatings[poiId[i]])

    //     $("#par" + i).append(deb);
    // }

    // for (var i = 0; i < 5; i++) {
    //     if (imgObjReviews[poiId[i]] !== undefined && imgObjReviewsDate[poiId[i]] !== undefined) {
    //     var realReview = $("<p>").text("Top review: " + imgObjReviews[poiId[i]] + " (from " + imgObjReviewsDate[poiId[i]] + ")")
    //     $("#par" + i).append(realReview);
    //     }
    // }

    // for (var i = 0; i < 5; i++) {
    //     if (imgObjRatings[poiId[i]] !== undefined) {
    //     var realRating = $("<p>").text("Average rating: " + imgObjRatings[poiId[i]])
    //     $("#par" + i).append(realRating)
    //     }
    // }



}


$(searchPan).on('click', function(){
    event.preventDefault();
    // clearAll();
    
    descriptions = [];
    poiId = [];
    imgId = [];
    anotherId = [];
    placeName = [];
    address = [];
    country = [];
    rank = [];
    revTxt = [];
    realRat = [];
    check = [];

    


    var city2 = $('#cityInput2').val();
    weatherSearch2(city2);
});

function clearAll(){

    for (var i = 0; i < 5; i++) {
        $("#imx" + i).removeAttr("src");
        $("#hel" + i).empty();
        $("#par" + i).empty();
        $("#ran" + i).empty();
        $("#rev" + i).empty();
        $("#rats" + i).empty();
    }
}