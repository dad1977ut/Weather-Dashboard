function displayCity(current) {
  var APIKey = "5c14eeb4a400165e995e3520868ac2c9";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    current +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".city").text(response.name);
      $(".temp").text("Temperature: " + tempF.toFixed(0));
      $(".city").text(response.name);
      $(".city").text(response.name);
    });
}
$("#search").on("click", function (event) {
  event.target;
  var current = $(event.target).siblings(".textarea").val();
  $("#sidebar").append(`<button>${current}</button><br>`);
  displayCity(current);
});
// var APIKey = "5c14eeb4a400165e995e3520868ac2c9";

// // Here we are building the URL we need to query the database
// var queryURL =
//   "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Springfield&cnt=6&appid=" +
//   APIKey;

// // Here we run our AJAX call to the OpenWeatherMap API
// $.ajax({
//   url: queryURL,
//   method: "GET",
// })
//   // We store all of the retrieved data inside of an object called "response"
//   .then(function (response) {
//     // Log the queryURL
//     console.log(queryURL);

//     // Log the resulting object
//     console.log(response);

//     // Transfer content to HTML
//     $(".city").append(response.name);
//     $(".wind").text("Wind Speed: " + response.wind.speed);
//     $(".humidity").text("Humidity: " + response.main.humidity);

//     // Convert the temp to fahrenheit
//     var tempF = (response.main.temp - 273.15) * 1.8 + 32;

//     // add temp content to html
//     $(".temp").text("Temperature (F) " + tempF.toFixed(2));
//     // $(".uv").text("UV: " + response.main.)

//     // Log the data in the console as well
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + tempF);
//   });
