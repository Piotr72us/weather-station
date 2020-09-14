// JavaScript

//onload - display last searched weather in today's weather

// function weatherSearch to send AJAX query for today's weather for searched city
    // temperature, humidity, wind, UV index with color
    // append results to today's weather div
    // append search name to the list of searched cities

function weatherSearch (cityname) {
    console.log(cityname);
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=5106834&APPID=af6923e95cbb6c53be8ceb07c2b776e5";
    var queryURL2 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=af6923e95cbb6c53be8ceb07c2b776e5";
    
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
    console.log(response);
    $(".city").empty().append(response.name);
    // $(".date").append(response.name);
    $(".icon2").empty().attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    $(".temp").empty().append("Temperature: " + response.main.temp);
    $(".humidity").empty().append("Humidity: " + response.main.humidity);
    $(".wind").empty().append("Wind Speed: " + response.wind.speed);
    // $("uv").append(response.name);
    var liEl = $("<li>").text(response.name);
    liEl.attr("class", "list-group-item");
    $(".list-group").append(liEl);

    });


}


//function weatherSearch5days - send AJAX query for weather 5 days in advance
    // append results to 5-day div

// call function weatherSearch() onclick or enter 

$(".btn").on("click", function(){
    var cityname = $("#input1").val().trim();
    weatherSearch(cityname);
    $("#input1").val("");
});
