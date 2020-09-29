const addtoTrip = $("form.trip");

// When the trip button is clicked, we validate the lat and lon are not blank
addtoTrip.on("submit", event => {
    event.preventDefault();
    const userData = {
        lat: $("input#latInfo").val(),
        lon: $("input#lonInfo").val()
    };

    if (!userData.lat || !userData.lon) {
        return;
    }
    // If we have an lat and lon, run the tripAdd function
    tripAdd(userData.lat, userData.lon);
    $("input#latInfo").val("");
    $("input#lonInfo").val("");
});

// Does a post to the trip route. If successful, we are redirected to the members page
// Otherwise we log any errors
function tripAdd(lat, lon) {
    $.post("/api/trip", {
        lat: lat,
        lon: lon
    })
        .then(() => {
            console.log("added to trip");
        })
        .catch(handleLoginErr);
}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}