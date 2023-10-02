import {insertQueryData,insertAppointmentData} from './firebase.js';

  $("#formSubmit").click(async function(e) {
    e.preventDefault();
    const name = $("#main-contact-form").find("#fname").val();
    const email = $("#main-contact-form").find("#email").val();
    const message = $("#main-contact-form").find("#message").val();
    await insertQueryData(name,email,message);
    $("#main-contact-form").trigger("reset");
    window.location.href = 'thanking.html';
  });

  $("#footer-form-submit").click(async function(e) {
    e.preventDefault();
    const name = $("#footer-contact-form").find("#f-fname").val();
    const email = $("#footer-contact-form").find("#f-email").val();
    const message = $("#footer-contact-form").find("#f-message").val();
    await insertQueryData(name,email,message);
    $("#footer-contact-form").trigger("reset");
    window.location.href = 'thanking.html';
  });

  $("#appoint-submit-button").click(async function(e) {
    e.preventDefault();
    await insertAppointmentData();
    $("#appointment-form").trigger("reset");
    window.location.href = 'thanking.html';
  });


