const addtoTrip = $("form.trip");
const latInput = $("input#latInfo");
const lonInput = $("input#lonInfo");

// When the trip button is clicked, we validate the lat and lon are not blank
addtoTrip.on("submit", event => {
    event.preventDefault();
    const userData = {
        lat: latInput.val(),
        lon: lonInput.val()
    };

    if (!userData.lat || !userData.lon) {
        return;
    }
    // If we have an lat and lon, run the tripAdd function
    tripAdd(userData.lat, userData.lon);
    latInput.val("");
    lonInput.val("");
});

// Does a post to the trip route. If successful, we are redirected to the members page
// Otherwise we log any errors
function tripAdd(lat, lon) {
    $.post("/api/trip", {
        lat: lat,
        lon: lon
    })
        .then(() => {
            window.location.replace("/members");
            // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}