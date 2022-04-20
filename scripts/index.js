/***************************************************************************/

/** Contain all the spesific functions:
 * DOM Elements Selecting
 *  All the configuration settings objects that their values depend on the HTML file
 * functions that are used to Create Class instances of Forms or Cards.
 * triggered functions - used by calling
 *
 * @module index
 */

/***************************************************************************/

import {
  initialCards
} from "./data/cards.js";


import {
  formSettings,
  cardSettings,
  cardPopupSettings
} from "./utils/constants.js";

import {
  popupSettings,
  openPopup,
  closePopup,
  handleFocusOutPopup,
  handleEscPopup
} from "./utils/utils.js";

import {
  Card
} from "./classes/Card/Card.js";

import {
  PopupCard
} from "./classes/PopupCard.js";

import {
  FormValidator
} from "./classes/FormValidator/FormValidator.js";


/***************************************************************************/

/************************   DOM Elements Selecting   ***********************/

const content = document.querySelector("#content");

/** profile */
const profile = content.querySelector("#profile");
const profileInfo = profile.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDetails = profileInfo.querySelector(".profile__details");

/** edit-profile popup */
const editProfilePopup = document.querySelector("#edit-profile-form-popup");
const editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");

/** edit-profile form */
const editProfileFormTitle = editProfileForm.querySelector(".form__title");
const editProfileSaveButton = editProfileForm.querySelector(".form__submit-button");
/** user input fields */
const profileNameInput = editProfileForm.querySelector(".form__input_value_profile-name");
const profileJobInput = editProfileForm.querySelector(".form__input_value_profile-job");

/** gallery */
const gallery = content.querySelector(".gallery");

/** card-template */
const cardTemplate = document.querySelector("#card-template");
const cardElement = cardTemplate.querySelector('.card');

/** add-card */
const addCardPopup = document.querySelector("#add-card-form-popup");
const addCardPopupContainer = addCardPopup.querySelector(".popup__container");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector("#add-card-form");

/** add-card form */
const addCardFormTitle = addCardForm.querySelector(".form__title");
const addCardCreateButton = addCardForm.querySelector(".form__submit-button");

/** card popup */
const cardPopup = document.querySelector("#card-popup");
const cardPopupContainer = cardPopup.querySelector(".popup__container_value_card-popup");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close-button_placed_card-popup");
const cardCloseUpPicture = cardPopup.querySelector(".popup__close-up-picture");
const cardPictureDetails = cardPopup.querySelector(".popup__picture-details");

/***************************************************************************/


/***************************   Event Listeners   ***************************/

/** Activate Edit Profile Form */
profileEditButton.addEventListener("click", handleOpenEditProfileForm);

/** Activate Add Card Form */
addCardButton.addEventListener("click", handleOpenAddCardForm);

/************************      functions calls      ************************/

/** enables forms validation on page loading */
const validatableForms = [];
validatableForms.addCard = new FormValidator(formSettings, addCardForm);
validatableForms.addCard.enableValidation();
validatableForms.editProfile = new FormValidator(formSettings, editProfileForm);
validatableForms.editProfile.enableValidation();

/** enables cards loading on page loading */
loadDataCards(initialCards);

/***************************************************************************/


/************************   functions declarations   ***********************/

/***********************      Edit Profile Form      ***********************/

function handleOpenEditProfileForm() {
  loadExistData(editProfileForm, profile);
  editProfileCloseButton.addEventListener("click", handleCloseEditProfileForm);
  editProfileForm.addEventListener("submit", handleEditProfileSubmit);
  openPopup(editProfilePopup);
}

/** shows the existing profile values on the input fileds */
function loadExistData(formElement, loadInputsContainer) {
  validatableForms.editProfile.loadFormData();
  const inputsList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  inputsList.forEach((inputElement) => {
    inputElement.value = loadInputsContainer.querySelector(`#${inputElement.id}-load-value`).textContent;
  });
}

function handleEditProfileSubmit() {
  const profileUserData = validatableForms.editProfile.getSubmissionData();
  if (profileUserData) {
    editProfileByUzer(profileUserData);
  }
  editProfileForm.removeEventListener("submit", handleEditProfileSubmit);
  handleCloseEditProfileForm();
}

function editProfileByUzer(profileData) {
  for (let inputElement in profileData) {
    profile.querySelector(`#${inputElement}-input-load-value`).textContent = `${profileData[inputElement]}`;
  }
}

function handleCloseEditProfileForm() {
  editProfileCloseButton.removeEventListener("click", handleCloseEditProfileForm);
  closePopup(editProfilePopup);
}

/*************************      Add Card Form      *************************/

function handleOpenAddCardForm() {
  validatableForms.addCard.resetForm();
  addCardCloseButton.addEventListener("click", handleCloseAddCardForm);
  addCardForm.addEventListener("submit", handleAddCardSubmit);
  openPopup(addCardPopup);
}

/** load Card by the uzer */
function handleAddCardSubmit() {
  addCardByUzer();
  handleCloseAddCardForm();
  addCardForm.removeEventListener("submit", handleAddCardSubmit);
}

function handleCloseAddCardForm() {
  closePopup(addCardPopup);
  addCardCloseButton.removeEventListener("click", handleCloseAddCardForm);
}

/**********************************   cards   ******************************/

/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<initialCards>} - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardByData = createCard(cardData);
  });
}

/** load Card by the uzer */
function addCardByUzer() {
  const userCardData = validatableForms.addCard.getSubmissionData();
  if (userCardData) {
    const cardByUser = createCard(userCardData);
  }
}

function createCard(cardData) {
  const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
  addCardToGallery(newCard.generateCard());
}

function addCardToGallery(generatedCard) {
  gallery.prepend(generatedCard);
}

/***************************************************************************/
