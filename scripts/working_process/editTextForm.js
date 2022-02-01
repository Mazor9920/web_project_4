
profile__edit_button.addEventListener("click", editProfile);


function editProfile() {
  // view the existing value
  getValues(inputs[0], profile__name.textContent);
  getValues(inputs[1], profile__details.textContent);

  // save the temp changes to html
  popup__save_button.addEventListener("click", setInputValues);

}

// view the existing value, if any
function getValues(input_object, text_input) {
  if (text_input != null) {
    input_object.value = text_input;

  }
}

// save the temp changes to html
function setInputValues() {
  console.log(inputs[0].value);
  console.log(inputs[1].value);

   profile__name.insertAdjacentText('afterbegin', inputs[0].value);
   profile__details.insertAdjacentText('afterbegin', inputs[1].value);


  // profile__name.textContent = inputs[0].value;
  // profile__details.textContent = inputs[1].value;
}




/////////////////////////////////////////////////////////////////////////////


let content = document.querySelector("#content");
// let content = document.querySelector(".content");

let profile = content.querySelector(".profile");
let profile__info = profile.querySelector(".profile__info");

let profile__name = profile__info.querySelector(".profile__name");
let profile__details = profile__info.querySelector(".profile__details");

let popup = profile.querySelector(".popup");
let popup__form_container = popup.querySelector(".popup__form-container");
let popup__edit_form = popup__form_container.querySelector(".popup__edit-form");
let popup__save_button = popup__edit_form.querySelector(".popup__save-button");


//Initial Values
let inputs = popup__edit_form.querySelectorAll(".popup__input-field");

/////////////////////////////////////////////////////////////////////////////


// if profile__name/profile__info != null -> display content (value = content) instead initial value
// by textContent
//
// ?else -> value = required input

if user try to change value (click input box) -> older value removed

// if user click btn save -> save new value in the html

/////////////////////////////////////////////////////////////////////////////


function editProfile(){
  // view the existing value
  getValues(inputs[0], profile__name.textContent);
  getValues(inputs[1], profile__details.textContent);

  // save the temp changes to html
  popup__save_button.addEventListener("click", setInputValues);
}

// view the existing value, if any
function getValues(input_object, text_input){
  if (text_input != null)
  {
    input_object.value = text_input;
  }
}

// save the temp changes to html
function setInputValues(){
  profile__name.textContent = inputs[0].value;
  profile__details.textContent - inputs[1].value;
}













// if NULL -> = "Name",
// inputs[0].value = "Name";
// inputs[1].value = "About me";
// and test:
// console.log(inputs[0].value);
// console.log(inputs[1].value);
// else :

// // function to change input fields value
// // run after every  save click on edit form


if (inputs[0].value != null) {
  inputs[0].value = profile__name.textContent;
} else {
  inputs[0].value = "Name";
}

if (inputs[1].value != null) {
  inputs[1].value = profile__details.textContent;
} else {
  inputs[1].value = "About me";
}
