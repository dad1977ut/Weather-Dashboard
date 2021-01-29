function displayCity(city) {
  var APIKey = "5c14eeb4a400165e995e3520868ac2c9";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  })

    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log(lon);
      console.log(lat);
      var newQueryURL =
        "https:api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=" +
        APIKey;
      $.ajax({
        url: newQueryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $(".icon").empty();
        $("#forecast").empty();
        var icon = response.current.weather[0].icon;
        var alt = response.current.weather[0].description;
        $(".city").text(city);
        console.log(alt);
        $(".icon").append(
          "<img src=https://openweathermap.org/img/w/" + icon + ".png>"
        );
        $(".temp").text("Temperature: " + response.current.temp);
        $(".humidity").text("Humidity: " + response.current.humidity);
        $(".wind").text("Wind Speed: " + response.current.wind_speed);
        $(".uv").text("UV Index: " + response.current.uvi);
        for (var i = 1; i < 6; i++) {
          var date = new Date(response.daily[i].dt * 1000);
          var forecastIcon = response.daily[i].weather[0].icon;
          console.log(forecastIcon);
          $("#forecast").append(
            `<div class="col-2">
            <div class="card">
            <div class="card-body p-1">
            <h5 class="card-title">${
              date.getMonth() +
              1 +
              "/" +
              date.getDate() +
              "/" +
              date.getFullYear()
            }</h5>
            <img src=https://openweathermap.org/img/w/${forecastIcon}.png>
            <p class="card-text">temp: ${response.daily[i].temp.day}</p>
            <p class="card-text">Humidty: ${response.daily[i].humidity}</p>
            </div>
            </div>
            </div>`
          );
        }
      });
    });
}

$("#search").on("click", function (event) {
  event.target;
  var current = $(event.target).siblings(".textarea").val();
  $("#sidebar").append(`<button>${current}</button><br>`);
  displayCity(current);
});
