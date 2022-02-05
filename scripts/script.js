/////////////////////////////////////////////////////////////////////////////

/////////////////////////       DOM selecting       /////////////////////////

let content = document.querySelector("#content");
// let content = document.querySelector(".content");
let profile = content.querySelector(".profile");
let profileInfo = profile.querySelector(".profile__info");

let popup = document.querySelector(".popup");
let popupContainer = popup.querySelector(".popup__container");
let EditForm = popupContainer.querySelector(".popup__edit-form");

// buttons
let EditButton = profileInfo.querySelector(".profile__edit-button");
let CloseButton = popupContainer.querySelector(".popup__close-button");
let SaveButton = EditForm.querySelector(".popup__save-button");

// profile initial values
let profileName = profileInfo.querySelector(".profile__name");
let profileDetails = profileInfo.querySelector(".profile__details");

// temp input fields
let nameInput = EditForm.querySelector(".popup__input-field_value_name");
let jobInput = EditForm.querySelector(".popup__input-field_value_job");

/////////////////////////////////////////////////////////////////////////////

/////////////////////////      Event Listeners      /////////////////////////

EditButton.addEventListener("click", changePopupStatus);
CloseButton.addEventListener("click", changePopupStatus);

EditButton.addEventListener("click", loadProfile);

// watch the submit form event, it won't submit anywhere just yet
EditForm.addEventListener('submit', handleProfileFormSubmit);


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

// this function showes the existing profile values on input fileds
function loadProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDetails.textContent;
}
/////////////////////////////////////////////////////////////////////////////

// this function edit the profile details by the user input
function handleProfileFormSubmit(evt) {
  // stops the browser from submitting the form in the default way.
  evt.preventDefault();

  // Insert new values
  profileName.textContent = nameInput.value;
  profileDetails.textContent = jobInput.value;

  //close popup
  changePopupStatus();
}
/////////////////////////////////////////////////////////////////////////////
