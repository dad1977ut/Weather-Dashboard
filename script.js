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
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
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
        var date = moment().format("MMMM Do YYYY");
        $(".city").text(city + " " + date);
        console.log(response.current.weather[0].icon);
        var icon = response.current.weather[0].icon;
        $(".icon").append(
          "<img src='https://openweathermap.org/img/w/" + icon + ".png'></img>"
        );
        $(".temp").text("Temperature: " + response.current.temp);
        $(".humidity").text("Humidity: " + response.current.humidity);
        $(".wind").text("Wind Speed: " + response.current.wind_speed);
        $(".uv").text("UV Index: " + response.current.uvi);
      });
    });
}
$("#search").on("click", function (event) {
  event.target;
  var current = $(event.target).siblings(".textarea").val();
  $("#sidebar").append(`<button>${current}</button><br>`);
  displayCity(current);
});
