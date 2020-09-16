// JavaScript
function load() {

var myAPI = "af6923e95cbb6c53be8ceb07c2b776e5"
//onload - display last searched weather in today's weather

var savedHistory = JSON.parse(localStorage.getItem("searches")) || [];

// function weatherSearch to send AJAX query for today's weather for searched city
    // temperature, humidity, wind, UV index with color
    // append results to today's weather div
    // append search name to the list of searched cities

function weatherSearch (citynames) {
    // console.log(cityname);
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=5106834&APPID=af6923e95cbb6c53be8ceb07c2b776e5";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citynames + "&appid=" + myAPI;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var windMph = (response.wind.speed * 2.23694);
        console.log(response);
        $(".city").empty().append(response.name);
        $(".icon2").empty().attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".temp").empty().append("Temperature: " + tempF.toFixed() + " °F");
        $(".humidity").empty().append("Humidity: " + response.main.humidity + "%");
        $(".wind").empty().append("Wind Speed: " + windMph.toFixed(1) + " mph");

        // var liEl = $("<li>").attr("class", "list-group-item").text(response.name);
        // $(".list-group").append(liEl);
        
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        uvIndex(lat, lon);

    });
}

function uvIndex(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + myAPI + "&lat=" + lat + "&lon=" + lon;
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        $(".uv").empty().removeClass("red; yellow; green");
        var uv = response.value.toFixed(1);
        //UV index changes color: low = green, moderate = yellow, severe = red;
        //UV index according to US EPA: https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html#:~:text=3%20to%205%3A%20Moderate,%2C%20and%20UV%2Dblocking%20sunglasses.

        if (parseInt(uv) <= 2) {
            document.querySelector(".uv").setAttribute('style', 'background-color: green !important; color: white');
            // document.querySelector(".uv").setAttribute('class', 'rounded');
            // $(".uv").addClass("badge badge-success !important");
        }
        else if (parseInt(uv) > 5) {
            document.querySelector(".uv").setAttribute('style', 'background-color: red !important; color: white');
            // $(".uv").addClass("badge badge-danger !important");
        }
        else {
        // else (parseInt(uv) > 2 && parseInt(uv) <= 5) {
            document.querySelector(".uv").setAttribute('style', 'background-color: yellow !important');
            // $(".uv").addClass("badge badge-warning !important");
        }

        $(".uv").append("UV Index: " + uv);

        $(".date").empty().append("(" + response.date_iso.split("T")[0] + ")");
    });
}

function weatherSearch5(cityname) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + myAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var show5days = document.querySelectorAll(".future");
        for (i = 0; i < show5days.length; i++) {
            show5days[i].textContent = "";
            var index = (i * 8) + 3;
            var dateEl = document.createElement("p");
            dateEl.setAttribute("class", "tempFont");
            dateEl.textContent = "(" + response.list[index].dt_txt.split(" ")[0] + ")";
            show5days[i].append(dateEl);
            

            var iconEl = document.createElement("img");
            iconEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.list[index].weather[0].icon + ".png");
            show5days[i].append(iconEl);

            var tempEl = document.createElement("p");
            tempEl.setAttribute("class", "tempFont");
            var tempF = (response.list[index].main.temp - 273.15) * 1.80 + 32;
            tempEl.textContent = "Temp: " + tempF.toFixed() + " °F";
            show5days[i].append(tempEl);

            var humEl = document.createElement("p");
            humEl.setAttribute("class", "tempFont");
            humEl.innerHTML = "Humidity: " + response.list[index].main.humidity + "%";
            show5days[i].append(humEl);

            // $(".future").empty().append("(" + response.list[3].dt_txt.split(" ")[0] + ")");
            // $(".future").empty().append(response.list[3].main.temp);
            // $(".future").empty().append(response.list[3].main.humidity)
            // var icon = $("<img>");
            // icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
            // $(".future").empty().append(icon);
        }
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
    localStorage.setItem("searches", JSON.stringify(savedHistory));
    showHistory();
});


function showHistory() {
    document.querySelector("#searchedCities").textContent = "";
    for (var i = 0; i < savedHistory.length; i++) {
        var recentEl = document.createElement("input");
        recentEl.setAttribute("class", "list-group-item");
        recentEl.setAttribute("type","text");
        recentEl.setAttribute("readonly",true);
        recentEl.setAttribute("value", savedHistory[i]);
        // console.log(recentEl.value);
        recentEl.addEventListener("click", function() {
            weatherSearch(recentEl.value);
            console.log(recentEl.value);
        });
        document.querySelector("#searchedCities").prepend(recentEl);

        // var liEl = $("<li>").attr("class", "list-group-item").text(response.name);
        // $(".list-group").append(liEl);
    }

}

showHistory();

if (savedHistory.length > 0) {
    weatherSearch(savedHistory[savedHistory.length - 1]);
}
// var x = $("#searchedCities");
// console.log(x);

}

load();