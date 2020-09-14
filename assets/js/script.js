// JavaScript
var myAPI = "af6923e95cbb6c53be8ceb07c2b776e5"
//onload - display last searched weather in today's weather

var savedHistory = JSON.parse(localStorage.getItem("searched")) || [];

// function weatherSearch to send AJAX query for today's weather for searched city
    // temperature, humidity, wind, UV index with color
    // append results to today's weather div
    // append search name to the list of searched cities

function weatherSearch (cityname) {
    // console.log(cityname);
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=5106834&APPID=af6923e95cbb6c53be8ceb07c2b776e5";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + myAPI;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var windMph = (response.wind.speed * 2.23694);
        console.log(response);
        $(".city").empty().append(response.name);
        $(".icon2").empty().attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".temp").empty().append("Temperature: " + tempF.toFixed() + " °F");
        $(".humidity").empty().append("Humidity: " + response.main.humidity + "%");
        $(".wind").empty().append("Wind Speed: " + windMph.toFixed(1) + " mph");

        var liEl = $("<li>").attr("class", "list-group-item").text(response.name);
        $(".list-group").append(liEl);
        
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        uvIndex(lat, lon);

    });
}

function uvIndex(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + myAPI + "&lat=" + lat + "&lon=" + lon;
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        $(".uv").empty().removeClass("badge");
        var uv = response.value.toFixed(1);
        
        if(parseInt(uv) <= 2) {
            $(".uv").addClass("badge badge-success");
        }
        else if (parseInt(uv) > 5) {
            $(".uv").addClass("badge badge-danger");
        }
        else {
            $(".uv").addClass("badge badge-warning");
        }

        $(".uv").append("UV Index: " + uv);

        $(".date").empty().append("(" + response.date_iso.split("T")[0] + ")");
    });
}

function weatherSearch5(cityname) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + myAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#day1").empty().append("(" + response.list[3].dt_txt.split(" ")[0] + ")");
        $("#day1").empty().append(response.list[3].main.temp);
        $("#day1").empty().append(response.list[3].main.humidity)
        var icon = $("<img>");
        icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
        $("#day1").empty().append(icon);
    });

}
//function weatherSearch5days - send AJAX query for weather 5 days in advance
    // append results to 5-day div

// call function weatherSearch() onclick or enter 

$(".btn").on("click", function(){
    var cityname = $("#input1").val().trim();
    weatherSearch(cityname);
    weatherSearch5(cityname);
    $("#input1").val("");
    savedHistory.push(cityname);
    localStorage.setItem("searched", JSON.stringify(savedHistory));
    showHistory();
});


function showHistory() {

}

// var x = $("#searchedCities");
// console.log(x);
//UV index according to US EPA: https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html#:~:text=3%20to%205%3A%20Moderate,%2C%20and%20UV%2Dblocking%20sunglasses.