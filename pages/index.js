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

/***************************************************************************/

// the main stylesheets file
import "./index.css";

// local images as strings - using an array of objects to create DOM elements to add to the page.
import logoSvg from "../images/logo.svg";
import profileImageSrc from "../images/profile-picture.png";


import {
  initialCards
} from "../scripts/data/cards.js";

import {
  initialUserProfile
} from "../scripts/data/userProfile.js";

import {
  formSettings,
  cardSettings,
  popupSettings,
  popupFormSettings,
  popupImageSettings,
  userInfoProfileSelectors
} from "../scripts/utils/constants.js";

// components
import Card from "../scripts/components/Card/Card.js";
import FormValidator from "../scripts/components/FormValidator/FormValidator.js";
import Popup from "../scripts/components/Popup/Popup.js";
import PopupWithImage from "../scripts/components/Popup/PopupWithImage.js";
import PopupWithForm from "../scripts/components/Popup/PopupWithForm.js";
import Section from "../scripts/components/Section/Section.js";
import UserInfo from "../scripts/components/UserInfo/UserInfo.js";
import TextContainer from "../scripts/components/TextContainer/TextContainer.js";

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

/******************************   Constants   ******************************/

/** create card-popup (popup with card, contains image & caption) */
const closeUpCardPopup = new PopupWithImage(`#card-popup`);

/** creates a section gallery of cards  */
const cardsGallerySection = new Section({
  initialSection: {
    items: initialCards,
    renderItem: (cardDataItem) => {
      const newCardElement = getCardWithPopup(cardDataItem, closeUpCardPopup);
      cardsGallerySection.addItemToBeginning(newCardElement);
    }
  },
  containerSelector: `#gallery`
});

/** creates the user info which is part of the profile section */
const userInfoProfile = new UserInfo(userInfoProfileSelectors);

/** creates the section profile  */
const profileSection = new TextContainer({
  containerSelector: `#profile`,
  initialSection: {
    textItems: initialUserProfile,
    renderAllItems: (userDataItems) => {
      for (const [itemKey, itemValue] of Object.entries(userDataItems)) {
        profileSection.setItemTextContent({
          sourceElementSelector: `#${itemKey}-profile-load-value`,
          newTextValue: itemValue
        });
      }
    }
  },
  handleTextItems: (newUserInfo) => {
    userInfoProfile.setUserInfo(newUserInfo);
  }
})

/** creates the section edit-profile form  */
const profileFormSection = new TextContainer({
  containerSelector: `#edit-profile-form`,
  initialSection: {
    textItems: initialUserProfile,
    renderAllItems: (userInputItems) => {
      for (const [itemKey, itemValue] of Object.entries(userInputItems)) {
        profileFormSection.setItemValue({
          sourceElementSelector: `#profile-${itemKey}-input`,
          newValue: itemValue
        });
      }
    }
  },
  handleTextItems: () => {
    const curentUserData = userInfoProfile.getUserInfo();
    profileFormSection.resetItems(curentUserData);
  }
})

/**********   forms   **********/

/** forms validation - creates validators for the forms */
const validatableForms = [];

validatableForms.editProfile = new FormValidator(formSettings, editProfileForm);
validatableForms.addCard = new FormValidator(formSettings, addCardForm);


/** forms activation - creates activators for the forms*/

const addCardActivePopupForm = new PopupWithForm({
  popupSelector: `#add-card-form-popup`,
  handleFormSubmitData: (newCardData) => {
    validatableForms.addCard.resetForm();
    /** avoid submit after closing form-popup by popup utils (as ESC) */
    if (addCardPopup.classList.contains(popupSettings.openPopupClass)) {
      cardsGallerySection.renderNewItem(newCardData);
    }
  }
});

const editProfileActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-form-popup`,
  handleFormSubmitData: (newUserProfileData) => {
    validatableForms.editProfile.resetForm();
    /** avoid submit after closing form-popup by popup utils (as ESC) */
    if (editProfilePopup.classList.contains(popupSettings.openPopupClass)) {
      /** set new user profile details */
      profileSection.handleTextItems(newUserProfileData);
    }
  }
});

/***************************************************************************/


/***************************************************************************/

/***************************   Functions calls   ***************************/

/** enables forms validation on page loading */
validatableForms.editProfile.enableValidation();
validatableForms.addCard.enableValidation();

/** load initial data */
cardsGallerySection.renderItemsList();
profileSection.initializeContainerText();
profileFormSection.initializeContainerText();

/***************************   Event Listeners   ***************************/

addCardButton.addEventListener("click", handleOpenAddCardForm);
profileEditButton.addEventListener("click", handleOpenEditProfileForm);

/***************************************************************************/


/************************   Functions declerations   ***********************/

/** return card with extra functionality of popup with image, which contains the card data */
function getCardWithPopup(cardData, popupWithCard) {
  const newCard = new Card({
    data: cardData,
    cardTemplateSelector: cardSettings.cardTemplateSelector,
    cardSettings,
    handleCardClick: (cardData) => handleCardPopupClick(cardData, popupWithCard)
  });
  return newCard.generateCard();
};

/** presents the closeUpCardPopup when the user trigger its opening */
function handleCardPopupClick(cardData, popupWithCard) {
  popupWithCard.openPopup({
    link: cardData.link,
    caption: cardData.name
  });
}

/**********   forms   **********/

function handleOpenAddCardForm() {
  validatableForms.addCard.resetForm();
  addCardActivePopupForm.openPopup();
};

function handleOpenEditProfileForm() {
  /** load exist data */
  profileFormSection.handleTextItems();
  validatableForms.editProfile.loadFormData();

  editProfileActivePopupForm.openPopup();
};

/***************************************************************************/
