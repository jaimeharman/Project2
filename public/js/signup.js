$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const locationInput = $("select#location-input")

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      location: locationInput.val()
    };

    if (!userData.email || !userData.password || !userData.location) {
      return;
    }
    // If we have an email, password, and location, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.location);
    emailInput.val("");
    passwordInput.val("");
    locationInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, location) {
    $.post("/api/signup", {
      email: email,
      password: password,
      location: location
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
});
