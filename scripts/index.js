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
  Card,
  PopupCard
} from "./classes/Card.js";

import {
  FormValidator,
  ResetFormValidator,
  ReloadFormValidator
} from "./classes/FormValidator.js";

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
const editProfilePopup = document.querySelector("#edit-profile-popup");
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

/** add-card popup */
const addCardPopup = document.querySelector("#add-card-popup");
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

/***************************************************************************/

/********************   caseonfiguration settings objects   *******************/

// stores selectors and classes for form Class
const formSettings = {
  formSelector: `.form`,
  formPopupClass: `.popup`,
  inputSelector: `.form__input`,
  submitButtonSelector: `.form__submit-button`,
  inactiveButtonClass: `form__submit-button_disabled`,
  inputErrorClass: `form__input_type_error`,
  errorClass: `form__input-error_visible`,
  fixedPlaceholderClass: `form__placeholder_is-fixed`
};

// stores selectors and classes for Card Class
const cardSettings = {
  cardSelector: `.card`,
  cardTemplateSelector: `.template_card`,
  inputCardNameSelector: `.form__input_value_card-name`,
  inputCardLinkSelector: `.form__input_value_card-link`,
  cardTitleSelector: `.card__title`,
  cardPictureSelector: `.card__picture`,
  cardLikeButtonSelector: `.card__like-button`,
  cardLikeButtonActiveClass: "card__like-button_active",
  cardDeleteButtonSelector: `.card__delete-button`,
  inputCardNameID: `card-name-input`,
  inputCardLinkID: `card-link-input`,
  cardsContainerSelector: `#gallery`
}

const cardPopupSettings = {
  cardPopupSelector: `#card-popup`,
  cardPopupCloseButtonSelector: `.popup__close-button_placed_card-popup`,
  cardPopupNameSelector: `.popup__picture-details`,
  cardPopupLinkSelector: `.popup__close-up-picture`
}

/***************************************************************************/

/***************************   Event Listeners   ***************************/

addCardForm.addEventListener("submit", handleAddCardSubmit);


/***************************************************************************/

/************************      functions calls      ************************/

/** enables forms validation on page loading */
const validatableForms = [];
validatableForms.addCard = getValidatableForm(addCardForm);
validatableForms.editProfile = getValidatableForm(editProfileForm);

loadDataCards(initialCards);

/***************************************************************************/

/************************   functions declarations   ***********************/

/*********************************   forms   *******************************/

/** enables all forms validation */
function getValidatableForm(formElement) {

  var validatableForm;

  switch (formElement) {

    case editProfileForm:
      validatableForm = new ReloadFormValidator(formSettings, editProfileForm, profile);
      break;

    case addCardForm:
      validatableForm = new ResetFormValidator(formSettings, addCardForm);
      break;
  }

  validatableForm.enableValidation();
  return validatableForm;
}

/**********************************   cards   ******************************/

function createCard(cardData) {
  const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
  addCardToGallery(newCard.generateCard());
}

/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<initialCards>} - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardByData = createCard(cardData);
  });
}

function loadCardByUzer(userCardData) {
  const cardByUser = createCard(userCardData);
}

function handleAddCardSubmit() {
  if (`_validInputsList` in validatableForms.addCard) {
    const userCardValidInputsList = validatableForms.addCard._validInputsList;
    loadCardByUzer(userCardValidInputsList);
  }
}

function addCardToGallery(generatedCard) {
  gallery.prepend(generatedCard);
}

/***************************************************************************/

// export {
//   formSettings,
//   cardSettings,
//   cardPopupSettings
// };
