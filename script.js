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
    });
}
$("#search").on("click", function (event) {
  event.target;
  var current = $(event.target).siblings(".textarea").val();
  $("#sidebar").append(`<button>${current}</button><br>`);
  displayCity(current);
});
