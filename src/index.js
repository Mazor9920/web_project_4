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
import "./styles/index.css";

// local images as strings → using an array of objects to create DOM elements to add to the page.
import logoSvg from "../images/logo.svg";
import profileImageSrc from "../images/profile-picture.png";


import {
  initialCards
} from "../scripts/data/cards.js";

import {
  formSettings,
  cardSettings,
  popupSettings,
  popupFormSettings,
  popupImageSettings
} from "../scripts/utils/constants.js";

// components
import Card from "../scripts/components/Card/Card.js";
import FormValidator from "../scripts/components/FormValidator/FormValidator.js";
import Popup from "../scripts/components/Popup/Popup.js";
import PopupWithImage from "../scripts/components/Popup/PopupWithImage.js";
import PopupWithForm from "../scripts/components/Popup/PopupWithForm.js";
import Section from "../scripts/components/Section/Section.js";
import UserInfo from "../scripts/components/UserInfo/UserInfo.js";


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


/***************************************************************************/

/***************************   Event Listeners   ***************************/

// profileEditButton.addEventListener("click", handleOpenEditProfileForm);


/***************************      constants      ***************************/


const editProfile = [];
const addCard = [];



/***************************************************************************/

editProfile.validatableForm = new FormValidator(formSettings, editProfileForm);
addCard.validatableForm = new FormValidator(formSettings, addCardForm);


/** enables forms validation on page loading */
editProfile.validatableForm.enableValidation();
addCard.validatableForm.enableValidation();
/***************************************************************************/


addCard.cardPopup = new PopupWithImage(`#card-popup`); 


/** presents the card-popup(popup with image) when the user trigger the opening */
const handleCardPopupClick = (clickedCardData) => {
  addCard.cardPopup.setImageData({
    link: clickedCardData.link, 
    caption: clickedCardData.name
  })
  addCard.cardPopup.openPopup();

}


/***************************************************************************/

const getPopupCard = (cardData) => {
  const newCard = new Card({
    data: cardData, 
    cardTemplateSelector: cardSettings.cardTemplateSelector, 
    cardSettings, 
    handleCardClick: handleCardPopupClick(cardData)});
    return newCard.generateCard();
};


const addCardToGallery = (generatedCard, gallerySection) => {
  gallerySection.addItem(generatedCard);
};

/***************************************************************************/

const cardsGallerySection = new Section({
  items: initialCards,
  renderer: (item) => {
      gallery.prepend(getPopupCard(item));
  }
}, `#gallery`);

/** load initial data cards */ 
cardsGallerySection.renderItems();

/***************************************************************************/


 
addCard.activePopupForm = new PopupWithForm({
  popupSelector: `#add-card-form-popup`,
  handleSubmitData: (newCardData) => {
    const newPopupCard = getPopupCard(newCardData);
    addCardToGallery(newPopupCard, cardsGallerySection);
  }
});



addCardButton.addEventListener("click", ()=>{
  //reset in the popup-form class
  addCard.activePopupForm.setEventListeners();
  addCard.activePopupForm.openPopup();
});






/***************************************************************************/



/***************************************************************************/




/*************************      functions calls      ***********************/


// const uzerInfoProfile = new UserInfo(uzerInfoProfileSelectors);

// const uzerInfoProfileData = uzerInfoProfile.getUserInfo();
// console.log("values:  " + uzerInfoProfileData);
/***************************************************************************/

// editProfile.popupWithForm = new PopupWithForm(`#edit-profile-form-popup`, (profileDataInputs) => {
//   editProfile.profileUzerInfo.setUserInfo(profileDataInputs);
//   editProfile.popupWithForm.closePopup();
// }
// );


// /** enables the loading of the exist profile data */
// editProfile.profileSection = new Section({
//   items: [],
//   loadExistData(inputElement){
//     inputElement.value = loadInputsContainer.querySelector(`#${inputElement.id}-load-value`).textContent;
//   }
// }, `#profile`);

// set initial form user data on page loading
// editProfile.profileSection.renderItems(userInfoData);


// resetItems(newItems)

/***************************************************************************/





/*************************      functions calls      ***********************/

/***************************************************************************/

/** enables forms activation on page loading */
// editProfile.popupWithForm.setEventListeners();
// addCard.popupWithForm.setEventListeners();


 /************************   functions declarations   ***********************/

/***************************************************************************/

/***********************      Edit Profile Form      ***********************/

// function handleOpenEditProfileForm(){
  // editProfile.profileSection.renderItems();
  // editProfile.validatableForm.loadFormData();
  // editProfile.popupWithForm.openPopup();
// };

// const handleEditProfileSubmit = (profileDataInputs) => {
//   editProfile.profileUzerInfo.setUserInfo(profileDataInputs);
//   editProfile.PopupWithForm.closePopup();
// };

/***************************************************************************/

/*************************      Add Card Form      *************************/


// const handleAddCardSubmit = (cardDataByUzer) => {
//   addCard.cardsGallerySection.addItem(cardDataByUzer);
// };


/*************************      general Forms      *************************/


/**********************************   cards   ******************************/
