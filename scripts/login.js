//partea de management al formularului
    //butonul de deschidere
document.querySelector("#log_in_button").addEventListener("click", openlogin, false);

function openlogin(event) {
  event.preventDefault();
  document.querySelector("#login_form_main_container").style.display="block";
  tout=setTimeout(function() {
      document.querySelector("#login_form_main_container").style.opacity=1;
  }, 20);
}



    //crucea de inchidere
document.querySelector("#login_form_box div[class='close_cross']").addEventListener("click", closelogin, false);
function closelogin() {
  document.querySelector("#login_form_main_container").style.opacity=0;
  document.querySelector("#login_form_box div[class='close_cross']").style.transform="rotate(-45deg)";
  interv=setInterval(function() {
    if (document.querySelector("#login_form_main_container").style.opacity==0) {
        document.querySelector("#login_form_main_container").style.display="none";
        document.querySelector("#login_form_box div[class='close_cross']").style.transform="rotate(45deg)";
    }
  }, 1000);
  if (document.querySelector("#login_form_main_container").style.display=="none") {
    clearInterval(interv);
  }
}
