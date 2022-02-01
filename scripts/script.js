/////////////////////////////////////////////////////////////////////////////

/////////////////////////       DOM selecting       /////////////////////////

let content = document.querySelector("#content");
// let content = document.querySelector(".content");

let profile = content.querySelector(".profile");
let profile__info = profile.querySelector(".profile__info");
let popup = profile.querySelector(".popup");
let popup__form_container = popup.querySelector(".popup__form-container");
let popup__edit_form = popup__form_container.querySelector(".popup__edit-form");

// buttons
let profile__edit_button = profile__info.querySelector(".profile__edit-button");
let popup__close_button = popup.querySelector(".popup__close-button");
let popup__save_button = popup__edit_form.querySelector(".popup__save-button");

// profile initial values
let profile__name = profile__info.querySelector(".profile__name");
let profile__details = profile__info.querySelector(".profile__details");
// temp input fields
let inputs = popup__edit_form.querySelectorAll(".popup__input-field");
let name_input = inputs[0];
let job_input = inputs[1];

/////////////////////////////////////////////////////////////////////////////

/////////////////////////      Event Listeners      /////////////////////////

profile__edit_button.addEventListener("click", changePopupStatus);
popup__close_button.addEventListener("click", changePopupStatus);

profile__edit_button.addEventListener("click", loadProfile);

// watch the submit form event, it won't submit anywhere just yet
popup__edit_form.addEventListener('submit', handleProfileFormSubmit);


/////////////////////////////////////////////////////////////////////////////

/////////////////////////         functions         /////////////////////////


/////////////////////////////////////////////////////////////////////////////

// this function changes the popup status - open or close
// close by defult, and changes status by click the buttons:
// edit(for open) / close(for close)
function changePopupStatus() {
  popup.classList.toggle("popup_opened");
}
/////////////////////////////////////////////////////////////////////////////

// this function show the existing profile values on input fileds, if any
function loadProfile() {
  getValues(name_input, profile__name.textContent);
  getValues(job_input, profile__details.textContent);
}

function getValues(input_object, text_input) {
  if (text_input !== null) {
    input_object.value = text_input;
  }
}
/////////////////////////////////////////////////////////////////////////////

// this function edit the profile details by the user input
function handleProfileFormSubmit(evt) {
  // stops the browser from submitting the form in the default way.
  evt.preventDefault();

  // Insert new values
  profile__name.textContent = name_input.value;
  profile__details.textContent = job_input.value;
}
/////////////////////////////////////////////////////////////////////////////
