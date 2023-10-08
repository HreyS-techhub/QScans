import {insertQueryData,insertAppointmentData} from './firebase.js';

  $("#formSubmit").click(async function(e) {
    e.preventDefault();
    const main_form = $("#main-contact-form")[0];
    if(main_form.checkValidity()){
      const name = $("#main-contact-form").find("#fname").val();
      const email = $("#main-contact-form").find("#email").val();
      const message = $("#main-contact-form").find("#message").val();
      await insertQueryData(name,email,message);
      $("#main-contact-form").trigger("reset");
      window.location.href = 'thanking.html';
    }else{
      alert("Form is invalid. Please fill in all required fields.");
    }
  });

  $("#footer-form-submit").click(async function(e) {
    e.preventDefault();
    const footer_form = $("#footer-contact-form")[0];
    if(footer_form.checkValidity()){
      const name = $("#footer-contact-form").find("#f-fname").val();
      const email = $("#footer-contact-form").find("#f-email").val();
      const message = $("#footer-contact-form").find("#f-message").val();
      await insertQueryData(name,email,message);
      $("#footer-contact-form").trigger("reset");
      window.location.href = 'thanking.html';
    }else{
      alert("Form is invalid. Please fill in all required fields.");
    }
  });

  $("#appoint-submit-button").click(async function(e) {
    e.preventDefault();
    const appointment_form = $("#appointment-form")[0];
    if(appointment_form.checkValidity()){
      await insertAppointmentData();
      $("#appointment-form").trigger("reset");
      window.location.href = 'thanking.html';
    }else{
      alert("Form is invalid. Please fill in all required fields.");
    }
  });


