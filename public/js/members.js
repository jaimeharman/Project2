let fullTrip = []



function loadmap() {
  console.log(JSON.stringify(fullTrip));
  L.mapquest.key = "0tfYPkeZd3BGwgIqYGALw5AGWEC1jlLf";

  // Geocode three locations, then call the createMap callback
  L.mapquest.geocoding().geocode(JSON.stringify(fullTrip), createMap);

  function createMap(error, response) {
    // Initialize the Map
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    var map = L.mapquest.map('map', {
      layers: L.mapquest.tileLayer('map'),
      center: [0, 0],
      zoom: 12
    });

    // Generate the feature group containing markers from the geocoded locations
    var featureGroup = generateMarkersFeatureGroup(response);

    // Add markers to the map and zoom to the features
    featureGroup.addTo(map);
    map.fitBounds(featureGroup.getBounds());
  }

  function generateMarkersFeatureGroup(response) {
    var group = [];
    for (var i = 0; i < response.results.length; i++) {
      var location = response.results[i].locations[0];
      var locationLatLng = location.latLng;

      // Create a marker for each location
      var marker = L.marker(locationLatLng, { icon: L.mapquest.icons.marker() })
        .bindPopup(location.adminArea5 + ', ' + location.adminArea3);

      group.push(marker);
    }
    return L.featureGroup(group);
  }
}


$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".taco").text("Welcome " + data.email);
  });

  $.get("/api/trip").then(data => {
    for (let i = 0; i < data.length; i++) {
      let ulTrip = $("#ulTrip")
      let liTrip = `<li>
      <div class="collapsible-header"><i class="material-icons">location_on</i>Location:${i + 1}</div>
      <div class="collapsible-body">
        <div>${data[i].fullName}</div>
        <a class="waves-effect waves-light btn-small deleteTrip" data-value="${data[i].id}">Remove</a>
      </div>
    </li>`;
      ulTrip.append(liTrip)
      fullTrip.push(data[i].lat + "," + data[i].lon)
    }
    loadmap();

    $(".deleteTrip").on("click", function () {
      const id = $(this).data("value")
      deleteTrip(id)
    })
  })

  function deleteTrip(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/trip/" + id
    })
    location.reload()
  }

});



