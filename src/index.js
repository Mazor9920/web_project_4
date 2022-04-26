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

 /************************      functions calls      ************************/

 const addCard = [];
 /** enables forms validation on page loading */
 addCard.validatableForm = new FormValidator(formSettings, addCardForm);
 addCard.validatableForm.enableValidation();




 /***************************************************************************/

 const editProfile = [];
 /** enables forms validation on page loading */
 editProfile.validatableForm = new FormValidator(formSettings, editProfileForm);
 editProfile.validatableForm.enableValidation();







  /** enables cards loading on page loading */
  loadDataCards(initialCards);

  /***************************************************************************/
