    //butonul de deschidere
document.querySelector("#sign_up_button").addEventListener("click", openSignUp, false);

function openSignUp(event) {
  event.preventDefault();
  document.querySelector("#signup_form input[type='range']").value=Math.ceil(Math.random()*(document.querySelector("#signup_form input[type='range']").getAttribute("max")));
  //^ seteaza varsta de pe slider sa fie un numar random intre 1 si maximul dat ca atribut
  changeVarstaPosition (document.querySelector("#signup_form input[type='range']"), document.querySelector("#signup_form_box output[id='varsta_out']"));
  document.querySelector("#signup_form_main_container").style.display="block";
  tout=setTimeout(function() {
      document.querySelector("#signup_form_main_container").style.opacity=1;
  }, 20);
}



    //crucea de inchidere
function closeSignUp() {
  document.querySelector("#signup_form_main_container").style.opacity=0;
  document.querySelector("#signup_form_box div[class='close_cross']").style.transform="rotate(-45deg)"; //rotesc crucea cand se inchide
  interv=setInterval(function() {
    if (document.querySelector("#signup_form_main_container").style.opacity==0) {
        document.querySelector("#signup_form_main_container").style.display="none";
        document.querySelector("#signup_form_box div[class='close_cross']").style.transform="rotate(45deg)"; //o rotesc la loc cand nu mai e vizibil, ca sa o pot roti si data viitoare cand inchid
        //resetez si slider-ul de range cand inchid
        document.querySelector("#signup_form input[type='range']").value=Math.ceil(Math.random()*(document.querySelector("#signup_form input[type='range']").getAttribute("max")));
        changeVarstaPosition (document.querySelector("#signup_form input[type='range']"), document.querySelector("#signup_form_box output[id='varsta_out']"));
    }
  }, 1000);
  if (document.querySelector("#signup_form_main_container").style.display=="none") {
    clearInterval(interv);
  }
}

  //inchiderea
  document.querySelector("#signup_form_box div[class='close_cross']").addEventListener("click", closeSignUp, false);


    //afisare a varstei
function changeVarstaPosition (obj, afisVarsta){ //obj va fi inputul (range sliderul)
  var valoare=obj.value;
  var min=obj.getAttribute("min");
  var max=obj.getAttribute("max");
  var proportie=valoare/(max-min);
  afisVarsta.innerHTML=valoare;
  afisVarsta.style.left=proportie*100+"%";
}

changeVarstaPosition (document.querySelector("#signup_form input[type='range']"), document.querySelector("#signup_form_box output[id='varsta_out']"));
document.querySelector("#signup_form input[type='range']").addEventListener("input", function() { changeVarstaPosition(this, document.querySelector("#signup_form_box output[id='varsta_out']") ); }, false);



    //partea de verificare a campurilor

const EMAILFIELD=document.querySelector("input[id='email_field']");
const PASSFIELD=document.querySelector("input[id='password_field']");
const PASSREVEAL=document.querySelector("button[id='passreveal']")


EMAILFIELD.addEventListener("keydown", function() {emailDisp(this);}, false);
EMAILFIELD.addEventListener("keyup", function() {emailCheck(this);}, false);
EMAILFIELD.addEventListener("blur", function() {emailBlur(this);}, false);
PASSFIELD.addEventListener("keydown", function() {passDisp(this);}, false);
PASSFIELD.addEventListener("keyup", function() {passCheck(this);}, false);
PASSFIELD.addEventListener("blur", function() {passBlur(this);}, false);
PASSREVEAL.addEventListener("click", passReveal, false);

function emailDisp(obj) {
    if (obj.value==="") {
      obj.style["border"]="3px grey solid";
    }
}

function emailCheck(obj) {
    let tester=new RegExp("^[A-Za-z0-9!#$%&'*+=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+=?^_`{|}~]+)*@[A-Za-z0-9!#$%&'*+=?^_`{|}~]+([A-Z0-9a-z!#$%&'*+=?^_`{|}~]*\.)+[a-z]+$");
    if (obj.value!=="") {
        if (tester.test(obj.value)) {
          obj.style["border"]="3px green solid";
          return true;
        } else {
          obj.style["border"]="3px red solid";
          return false;
        }
    }
    return true; //daca nu am nimic vreau sa nu mai fie gri
}

function passBlur(obj) { //campul ramane rosu daca emailul nu e bun si devine normal daca e bun
    if (emailCheck(obj)) {
        obj.style["background-color"]="";
    }
}

function passDisp(obj) {
    if (obj.value==="") {
      obj.style["background-color"]="grey";
    }
}

function passCheck(obj) {
    let tester=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?])[a-zA-Z0-9!?]{8,}$");
    if (obj.value!=="") {
        if (tester.test(obj.value)) {
          obj.style["background-color"]="green";
          var deSters=PASSFIELD.closest(".form_elem").querySelector("div"); //sterge divul pe care l-am pus in else, adica cel din divul cu clasa form-elem care contine passfield
          if (deSters) {
            deSters.remove();
          }
          return true;
        } else {
          if (!PASSFIELD.closest(".form_elem").querySelector("div")) {
            obj.style["background-color"]="red";
            var corpul=document.createElement("div");
            corpul.appendChild(document.createTextNode("Parola trebuie sa contina litere mari, litere mici, numere si cel putin unul dintre ! sau ? (si doar asta)"));
            corpul.style.position="absolute";
            corpul.style.left="105%";
            corpul.style.background="white";
            corpul.style.color="black";
            corpul.style["font-size"]="10pt";
            corpul.style.width="200px";
            corpul.style.height="50pt";
            corpul.style.cursor="default";
            corpul.style["user-select"]="none";
            var formElem=PASSFIELD.closest(".form_elem");
            formElem.appendChild(corpul);
          }
          return false;
        }
    }
    return true; //daca nu am nimic vreau sa nu mai fie gri
}

function emailBlur(obj) { //campul ramane rosu daca emailul nu e bun si devine normal daca e bun
    if (emailCheck(obj)) {
        obj.style["background-color"]="";
    }
}

function passReveal(e) {
    e.preventDefault();
    if(PASSFIELD.getAttribute("type")==="text"){
      PASSFIELD.setAttribute("type", "password");
    } else {
      PASSFIELD.setAttribute("type", "text");
    }
}
