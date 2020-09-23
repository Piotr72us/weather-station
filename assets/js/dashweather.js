function dashboardIcons(cityDash) {
    var APIkey = "af6923e95cbb6c53be8ceb07c2b776e5";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityDash + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        // ADD THIS
        var temp = response.main.temp;
        var country = response.sys.country;
        // var icon = $("<img>").empty().attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        $("#weather-input").empty().append(temp.toFixed(0) + " °F");
        $("#currency-input").empty().attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        $("#language-input").empty().append(country);
        getDate(lat, lon);
    });
}

function getDate(lat, lon) {
    var APIkey = "af6923e95cbb6c53be8ceb07c2b776e5";
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#time-input").empty().append("(" + response.date_iso.split("T")[0] + ")");
    });
}