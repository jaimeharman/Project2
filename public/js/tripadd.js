const addtoTrip = $("form.trip");

// When the trip button is clicked, we validate the lat and lon are not blank
addtoTrip.on("submit", event => {
    event.preventDefault();
    alert("Trip Added");
    const userData = {
        lat: $("input#latInfo").val(),
        lon: $("input#lonInfo").val(),
        fullName: $("input#nameInfo").val()
    };
    console.log(userData);
    if (!userData.lat || !userData.lon || !userData.fullName) {
        return;
    }

    // If we have an lat and lon, run the tripAdd function
    tripAdd(userData.lat, userData.lon, userData.fullName);
    $("input#latInfo").val("");
    $("input#lonInfo").val("");
    $("input#nameInfo").val("");
});

// Does a post to the trip route. If successful, we are redirected to the members page
// Otherwise we log any errors
function tripAdd(lat, lon, fullName) {
    $.post("/api/trip", {
        lat: lat,
        lon: lon,
        fullName: fullName
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
