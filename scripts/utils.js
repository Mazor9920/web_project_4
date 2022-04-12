

/***************************************************************************/

/**
 *  Various utility functions that are used throughout the codebase.
 * @module utils
 */

/***************************************************************************/

/************************      Event Listeners      ************************/

/** edit-profile-form popup */

profileEditButton.addEventListener("click", function(evt) {
  loadProfile();
  openPopup(editProfilePopup);
});

editProfileCloseButton.addEventListener("click", function(evt) {
  closePopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

/** add-card-form popup */

addCardButton.addEventListener("click", function(evt) {
  resetCardForm(settings, addCardForm);
  openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", function(evt) {
  closePopup(addCardPopup);
});

addCardForm.addEventListener('submit', handleAddCardSubmit);



/*************************************************************************/

/************************   functions declarations   *********************/

/***************************   general popups   **************************/

/** opens the popup window */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  // add a temporary Listeners:
  popupElement.addEventListener('mousedown', handleFocusOutPopup);
  document.addEventListener('keydown', handleEscPopup);
}

/** closes the popup window */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  // remove temporary Listeners:
  popupElement.removeEventListener('mousedown', handleFocusOutPopup);
  document.removeEventListener('keydown', handleEscPopup);
}

/** allows the users to close the popup by clicking on the overlay */
function handleFocusOutPopup(evt) {
  const openedPopupElement = evt.currentTarget;
  const clickedElement = evt.target;
  // if the focus is outside the popup content
  if (clickedElement == openedPopupElement) {
    closePopup(openedPopupElement);
  }
}

/** allows the users to close an open popup by pressing the Esc key */
function handleEscPopup(evt) {
  const pressedKey = evt.key;
  if (pressedKey === "Escape") {
    const openedPopupElement = document.querySelector(".popup_opened");
    closePopup(openedPopupElement);
  }
}

/************************   add-card-form popup   ************************/

/** edits the card values by the user input */
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addCardForm = evt.target.closest(".form");
  const inputCard = createUzerCard(addCardForm);
  inputCard._addCardToGallery(gallery);
  closePopup(addCardPopup);
}

/**********************   edit-profile-form popup   **********************/

/** edits the profile details by the user input */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDetails.textContent = profileJobInput.value;
  closePopup(editProfilePopup);
}

/** shows the existing profile values on the input fileds */
function loadProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDetails.textContent;
  freezePlaceholder(editProfileForm, profileNameInput);
  freezePlaceholder(editProfileForm, profileJobInput);
  hideInputError(settings, editProfileForm, profileNameInput);
  hideInputError(settings, editProfileForm, profileJobInput);
  editProfileSaveButton.classList.add(settings.inactiveButtonClass);
}
