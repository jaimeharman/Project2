window.onload = function () {
  
}

function getMapData() {
  //api call to mapquest with object containing points
  //call renderMap when done

}

function renderMap(lat, lng) {

  L.mapquest.key = 'Q4owqN5kiAevxpxwatX5X8PEeYeNYlME';

  var map = L.mapquest.map('map', {
    center: [lat, lng],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  map.addControl(L.mapquest.control());


}



$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  
});
