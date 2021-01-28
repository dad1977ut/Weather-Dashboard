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
        $(".temp").text(response.current.temp);
        $(".humidity").text(response.current.humidity);
        $(".wind").text(response.current.wind_speed);
        $(".uv").text(response.current.uvi);
        var date = new Date(response.daily[1].dt * 1000);
        var forecastIcon = response.daily[1].weather[0].icon;
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
                <p class="card-text">${response.daily[1].temp.day}</p>
                <p class="card-text">${response.daily[1].humidity}</p>
              </div>
            </div>
          </div>`
        );
      });
    });
}

$("#search").on("click", function (event) {
  event.target;
  var current = $(event.target).siblings(".textarea").val();
  $("#sidebar").append(`<button>${current}</button><br>`);
  displayCity(current);
});
