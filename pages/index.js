/***************************************************************************/
/**  The primary module of this project.
 * Contain all the spesific code and functions which unique to this specific page.
 *
 * Includes:
 * DOM Elements Selecting
 * Creation of new class instances for Forms and Cards, by data transferring.
 * descriptions of the interactions between these classes, defining their relationship.
 * triggered functions - used by calling
 *
 * @module index
 */

/***************************************************************************/

import {
  initialCards
}
from "../scripts/data/cards.js";


import {
  formSettings,
  cardSettings,
  cardPopupSettings
} from "../scripts/utils/constants.js";

import {
  popupSettings,
  openPopup,
  closePopup,
  handleFocusOutPopup,
  handleEscPopup
} from "../scripts/utils/utils.js";

import {
  Card
} from "../scripts/components/Card/Card.js";

import {
  PopupCard
} from "../scripts/components/PopupCard.js";

import {
  FormValidator
} from "../scripts/components/FormValidator/FormValidator.js";


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
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
editProfileCloseButton.addEventListener("click", () => closePopup(editProfilePopup));

/** Activate Add Card Form */
addCardButton.addEventListener("click", handleOpenAddCardForm);
addCardForm.addEventListener("submit", handleAddCardSubmit);
addCardCloseButton.addEventListener("click", () => closePopup(addCardPopup));

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
  validatableForms.editProfile.loadFormData();
  openPopup(editProfilePopup);
}

function handleEditProfileSubmit() {
  /** avoid submit after closing form-popup by popup utils (as ESC) */
  if (editProfilePopup.classList.contains(popupSettings.openPopupClass)) {
    editProfileByUzer();
    closePopup(editProfilePopup);
  }
}

function editProfileByUzer() {
  const profileData = getSubmissionData(editProfileForm);
  if (profileData) {
    for (const inputElement in profileData) {
      profile.querySelector(`#${inputElement}-input-load-value`).textContent = `${profileData[inputElement]}`;
    }
  }
}

/*************************      Add Card Form      *************************/

function handleOpenAddCardForm() {
  validatableForms.addCard.resetForm();
  openPopup(addCardPopup);
}

/** load Card by the uzer */
function handleAddCardSubmit() {
  /** avoid submit after closing form-popup by popup utils (as ESC) */
  if (addCardPopup.classList.contains(popupSettings.openPopupClass)) {
    addCardByUzer();
    closePopup(addCardPopup);
  }
}

/** load Card by the uzer */
function addCardByUzer() {
  const userCardData = getSubmissionData(addCardForm);
  if (userCardData) {
    createCard(userCardData);
  }
}

/*************************      general Forms      *************************/

function getSubmissionData(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  const submissionData = inputsList.reduce((fieldData, inputElement) => {
    fieldData[inputElement.name] = inputElement.value;
    return fieldData;
  }, {});
  return submissionData;
}

/** shows the existing values of the loadInputsContainer on the input fileds of the formElement */
function loadExistData(formElement, loadInputsContainer) {
  const inputsList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  inputsList.forEach((inputElement) => {
    inputElement.value = loadInputsContainer.querySelector(`#${inputElement.id}-load-value`).textContent;
  });
}

/**********************************   cards   ******************************/

/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<initialCards>} - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    createCard(cardData);
  });
}

function createCard(cardData) {
  const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
  addCardToGallery(newCard.generateCard());
}

function addCardToGallery(generatedCard) {
  gallery.prepend(generatedCard);
}

/***************************************************************************/
