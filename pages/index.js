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

// the main stylesheets file
import "./index.css";

// local images as strings - using an array of objects to create DOM elements to add to the page.
import logoSvg from "../images/logo.svg";


import {
  defaultCardsList,
  myCardsList
} from "../scripts/data/cards.js";

import{
  defaultUserProfile,
  myUserProfile
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
import Api from "../scripts/components/Api/Api.js";
import UsersApi from "../scripts/components/Api/UsersApi.js";
import CardsApi from "../scripts/components/Api/CardsApi.js";

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
const profileAboutInput = editProfileForm.querySelector(".form__input_value_profile-about");

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

/**************************   section constants   **************************/

/** create card-popup (popup with card, contains image & caption) */
const closeUpCardPopup = new PopupWithImage(`#card-popup`);

/** creates a section gallery of cards  */
const cardsGallerySection = new Section({
  initialSection: {
    items: [],
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
    textItems: {},
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
    textItems: {},
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

/***************************   forms constants   ***************************/

/** forms validation - creates validators for the forms */
const validatableForms = {};

validatableForms.editProfile = new FormValidator(formSettings, editProfileForm);
validatableForms.addCard = new FormValidator(formSettings, addCardForm);


/** forms activation - creates activators for the forms*/

const addCardActivePopupForm = new PopupWithForm({
  popupSelector: `#add-card-form-popup`,
  handleFormSubmitData: (newCardData) => {
    validatableForms.addCard.resetForm();
    addNewCard(newCardData);
  }
});


const editProfileActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-form-popup`,
  handleFormSubmitData: (newUserProfileData) => {
    validatableForms.editProfile.resetForm();
    editExistingProfile({
      newUserProfileData, 
      userTargetExtension: `me`
    });
  }
});

/****************************   API constants   ****************************/

/** a ready-made token for user authorization */
const myToken = 'a536be73-4985-4fb4-8e75-ccb3eebe93a6';
const myGroupId = 'group-12';
const baseUrlByGroup = 'https://around.nomoreparties.co/v1/' + myGroupId;
const defaultHeaders = {
  authorization: myToken,
  'Content-type': 'application/json',
};

const usersApiData = new UsersApi({
  baseUrl: baseUrlByGroup,
  headers: defaultHeaders
});


const cardsApiData = new CardsApi({
  baseUrl: baseUrlByGroup,
  headers: defaultHeaders
});



/***************************************************************************/

/***************************   Functions calls   ***************************/

/** I may have mistakenly sabotaged the original API data, 
      I tried to fix it but I don't have access.. */
// setInitialApiData(defaultCardsList);

handlePageLoading();

editExistingProfile({
  newUserProfileData: myUserProfile, 
  userTargetExtension: `me`
});

addNewCards(myCardsList);


function editExistingProfile({newUserProfileData, userTargetExtension}){
  /** set new user profile details on the page */
  profileSection.handleTextItems(newUserProfileData);
  /** set new user profile details on the API data */
  usersApiData.updateUserProfile({userExtension: userTargetExtension, newUserProfileData});
}



function addNewCard(newCardData){
  /** add a new card on the page */
  cardsGallerySection.renderNewItem(newCardData);
  /** add a new card to the server */
  cardsApiData.post({
    urlTargetExtension: `/cards`,
    bodyItems: newCardData
  });

}

function addNewCards(cardsList){
  cardsList.forEach((cardData) => {
    addNewCard(cardData);
  });
}

/***************************   Event Listeners   ***************************/

addCardButton.addEventListener("click", handleOpenAddCardForm);
profileEditButton.addEventListener("click", handleOpenEditProfileForm);

/***************************************************************************/

/************************   Functions declerations   ***********************/

function handlePageLoading() {
  loadPageData();
  enableAllFormsValidation();
}

/****************************   data functions   ***************************/

/**********   cards data   **********/

function setInitialCardsList(cardsListData){
  cardsGallerySection.resetItemsList(cardsListData);
}

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

/**********   profile data   **********/

function setInitialUserProfile(userProfileApiData) {
  loadProfileInfo({
    name: userProfileApiData.name,
    about: userProfileApiData.about
  });
  loadProfilePicture(userProfileApiData.avatar);
}

function loadProfileInfo(userInfoData) {
  profileSection.resetItems(userInfoData);
  profileFormSection.resetItems(userInfoData);
}

function loadProfilePicture(profileAvatarSrc) {
  profile.querySelector(`#avatar-profile-load-value`).src = profileAvatarSrc;
}

/***************************   forms functions   ***************************/

/** enables forms validation on page loading */
function enableAllFormsValidation() {
  validatableForms.editProfile.enableValidation();
  validatableForms.addCard.enableValidation();
}

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


/****************************   API functions   ****************************/



/** load initial API data on page loading - profile and cards  */
function loadPageData() {
  /** get initial data from the server */
  const initialUserProfile = usersApiData.getUserProfile(`me`);
  const initialCardsList = cardsApiData.getCardsApi();

  /** create an array of promises */
  const initialDataPromisesArray = [initialUserProfile, initialCardsList];
  /** getting the promises results of the initial user information and the initial list of cards */
  const allDataPromisesObj = Promise.all(initialDataPromisesArray)
    .then((results) => {
      setInitialUserProfile(results[0]);
      setInitialCardsList(results[1]);
    });
}



/***************************************************************************/


/***************************************************************************/

// NO Access
/** delete exist data and post its default values */
function setInitialApiData(defaultCardsList, defaultUserProfile){
  cardsApiData.setCardsApi(defaultCardsList);
  // user -> post on `users/me` ?
}


/****************************   API loading functions   ****************************/
//
// const handleDefaultLoading = (isLoading) => {
//   if (isLoad) {
//     console.log(`loading is on`);
//   } else {
//     console.log(`loading is off`);
//   }
// }
//
// function loadWhileGetApiData({
//     ApiObject,
//     urlTargetExtension,
//     options = {},
//     handleGetLoading,
//     handleGetResult
//   }) {
//     loadWhileApiProcess({
//       handleProcess: ApiObject.get(urlTargetExtension, options),
//       handleLoading: handleGetLoading,
//       handleResult: handleGetResult,
//       handleError: () => {
//         console.log(`ERROR! occurred while getting API data from the server, loading Error: ${err}`);
//       }
//     });
//   };
//
//   // while the API data is updating
//   loadWhileUpdateApiData({
//     ApiObject,
//     urlTargetExtension,
//     options = {},
//     bodyItems,
//     handleUpdateLoading,
//     handleUpdateResult
//   }) {
//     loadWhileApiProcess({
//       handleProcess: ApiObject.patch({
//         urlTargetExtension,
//         options,
//         bodyItems
//       }),
//       handleLoading: handleUpdateLoading,
//       handleResult: handleUpdateResult,
//       handleError: () => {
//         console.log(`ERROR! occurred while API is updating, loading Error: ${err}`);
//       }
//     });
//   };







/***************************************************************************/
/***************************************************************************/

// to do list:
// - new data by API
// - new handlers for loading initial data
// - new handlers for forms submission


/** old data: */
// import profileImageSrc from "../images/profile-picture.png";
// import {
//   initialCards
// } from "../scripts/data/cards.js";
// import {
//   initialUserProfile
// } from "../scripts/data/userProfile.js";

/** old functions for loading initial data: */
// cardsGallerySection.renderItemsList();
// profileSection.initializeContainerText();
// profileFormSection.initializeContainerText();
