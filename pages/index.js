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

import{
  myAuthorizationData,
  defaultUsersExtensions,
  defaultCardsExtensions
} from "../scripts/utils/constants.js";

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
import SharedCard from "../scripts/components/Card/SharedCard.js";
// import LikeButton from "../scripts/components/LikeButton/LikeButton.js"
// import Post from "../scripts/components/Post/Post.js"
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
import{
  Post,
  createPost
} from "../scripts/components/Post/Post.js";
import{
  PostOwner,
  createPostOwner
}from "../scripts/components/PostOwner/PostOwner.js";



/***************************************************************************/



/************************   DOM Elements Selecting   ***********************/

const content = document.querySelector("#content");

/** profile */
const profile = content.querySelector("#profile");
const addCardButton = profile.querySelector(".profile__add-button");
const profileInfo = profile.querySelector(".profile__info");
const profilePicture= profileInfo.querySelector(`#avatar-profile-load-value`);
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

/** edit-profile details popup */
const editProfilePopup = document.querySelector("#edit-profile-form-popup");
const editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");

/** edit-profile details form */
const editProfileFormTitle = editProfileForm.querySelector(".form__title");
const editProfileSaveButton = editProfileForm.querySelector(".form__submit-button");
/** user input fields */
const profileNameInput = editProfileForm.querySelector(".form__input_value_profile-name");
const profileAboutInput = editProfileForm.querySelector(".form__input_value_profile-about");


/** edit-profile-picture popup */
const editProfilePicturePopup = document.querySelector("#edit-profile-picture-form-popup");
const editProfilePicturePopupContainer = editProfilePicturePopup.querySelector(".popup__container");
const editProfilePictureCloseButton = editProfilePicturePopup.querySelector(".popup__close-button");
const editProfilePictureForm = editProfilePicturePopup.querySelector("#edit-profile-picture-form");

/** edit-profile-picture form */
const editProfilePictureFormTitle = editProfilePictureForm.querySelector(".form__title");
const editProfilePictureSaveButton = editProfilePictureForm.querySelector(".form__submit-button");
/** user link-input field */
const profilePictureInput = editProfilePictureForm.querySelector(".form__input_value_profile-picture-link");

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

/** delete card popup */
const deleteCardPopup = document.querySelector("#delete-card-form-popup"); 
const deleteCardPopupCloseButton = deleteCardPopup.querySelector(".popup__close-button_placed_delete-card-popup");
/** delete card form */
const deleteCardForm = deleteCardPopup.querySelector("#delete-card-form");;
const deleteCardButton = deleteCardForm.querySelector(".form__submit-button");


/****************************   API constants   ****************************/

const baseUrlByGroup = myAuthorizationData.baseUrl + myAuthorizationData.myGroupID;
const defaultHeaders = {
  authorization: myAuthorizationData.myToken,
  'Content-type': 'application/json',
};

const usersApiData = new UsersApi({
  extensions: defaultUsersExtensions,
  options:{
    baseUrl: baseUrlByGroup,
    headers: defaultHeaders
  }
});


const cardsApiData = new CardsApi({
  extensions: defaultCardsExtensions,
  options:{
    baseUrl: baseUrlByGroup,
    headers: defaultHeaders
  }
});



/***************************************************************************/

/**************************   section constants   **************************/

/** create card-popup (popup with card, contains image & caption) */
const closeUpCardPopup = new PopupWithImage(`#card-popup`);

/** creates a section gallery of cards  */
const cardsGallerySection = new Section({
  initialSection: {
    items: [],
    renderItem: (postCardDataItem) => {
      const newCardPostElement = getCardByPostData(postCardDataItem);
      cardsGallerySection.addItemToBeginning(newCardPostElement);
    }
  },
  containerSelector: `#gallery`
});


/** for adding Post prototype to the new card element */
function getCardByPostData(postCardData){
  debugger;
  const cardData = {name: postCardData.name, link: postCardData.link};
  const postCardOwner = createPostOwner(postCardData.owner);

  const postCard = createPost( {

      likes: postCardData.likes,
       _id: postCardData._id, 
       createdAt: postCardData.createdAt, 
      ownerData: postCardOwner,
      postData: cardData
    } );

  const newPostCardElement = getCardElementWithPopup({
    cardData : postCard, 
    cardPopup: closeUpCardPopup
  });

  return newPostCardElement;
}





// function getCardOwnerForPost(){

//   const ownerInfo = currentOwnerProfile;
//   console.log(ownerInfo);

//   const currentUserInfo = userInfoProfile.getUserInfo();

//   const owner = createPostOwner({
//     ownerID, 
//     ownerName, 
//     ownerAbout, 
//     ownerCohort, 
//     ownerAvatar
// });
 

//    return owner;
// }

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
const profileDetailsFormSection = new TextContainer({
  containerSelector: `#edit-profile-form`,
  initialSection: {
    textItems: {},
    renderAllItems: (userInputItems) => {
      for (const [itemKey, itemValue] of Object.entries(userInputItems)) {
        profileDetailsFormSection.setItemValue({
          sourceElementSelector: `#profile-${itemKey}-input`,
          newValue: itemValue
        });
      }
    }
  },
  handleTextItems: () => {
    const curentUserData = userInfoProfile.getUserInfo();
    profileDetailsFormSection.resetItems(curentUserData);
  }
})

/***************************   forms constants   ***************************/

/** forms validation - creates validators for the forms */
const validatableForms = {};

validatableForms.editProfileInfo = new FormValidator(formSettings, editProfileForm);
validatableForms.addCard = new FormValidator(formSettings, addCardForm);
validatableForms.editProfilePicture = new FormValidator(formSettings, editProfilePictureForm);

/** forms activation - creates activators for the forms*/

const addCardActivePopupForm = new PopupWithForm({
  popupSelector: `#add-card-form-popup`,
  handleFormSubmitData: (newCardData) => {
    validatableForms.addCard.resetForm();
    addNewPostCard(newCardData);
  }
});


const editProfileDetailsActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-form-popup`,
  handleFormSubmitData: (newUserProfileData) => {
    validatableForms.editProfileInfo.resetForm();
    editProfile({
      newUserProfileData, 
      userTargetExtension: defaultUsersExtensions.owner
    });
  }
});

SharedCard.prototype.ensureDeleteIsSafe = (postCardPrototype) => {
  /** presents the deleteCardPopup when the user trigger its opening */
    deleteCardPopupActiveForm.openPopup(); 
    deleteCardPopupActiveForm.__proto__ = postCardPrototype;
};


/** popup which verify that the user want to delete the card, deletion can't be undone. */
const deleteCardPopupActiveForm = new PopupWithForm({
  popupSelector: `#delete-card-form-popup`,
  processSubmit: () => {
    debugger;
    // SharedCard.prototype.deleteForSure();
    deleteCardPopupActiveForm.__proto__.aboutToDelete.deleteForSure();
  },
});

const editProfilePictureActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-picture-form-popup`,
  processSubmit: () => {
    debugger;

    console.log(`evt`);
    // .__proto__.
  },
});


/***************************   Event Listeners   ***************************/

addCardButton.addEventListener("click", handleOpenAddCardForm);
profileEditButton.addEventListener("click", handleOpenEditProfileForm);
profilePicture.addEventListener("click", handleOpenEditProfilePictureForm);

/***************************************************************************/

/***************************   Functions calls   ***************************/

// Loading users & cards information from the server
loadPageData();

enableAllFormsValidation();

// handleProject();

function handleProject(){

  debugger;
   
  console.log(`initial owner profile: ${usersApiData.getOwnerProfile}`);
  
  //  example of save profile data on the page and on the server once edited 
  const editedProfile = editProfile({
    newUserProfileData: myUserProfile, 
    userTargetExtension: defaultUsersExtensions.owner
  });
  
  console.log(`editedProfile: ${editedProfile}`);
  console.log(`currentOwnerProfile after edit: ${usersApiData.getOwnerProfile}`);
  
  //  example of save 2 new cards data on the page and on the server once added
  addNewPostCardsList(myCardsList);
  
  //  
}


/***************************************************************************/


/************************   Functions declerations   ***********************/


/****************************   API functions   ****************************/


/** load initial API data on page loading - profile and cards  */
function loadPageData() {
  /** get initial data from the server */
  const initialUserProfile = usersApiData.getUserProfile(defaultUsersExtensions.owner);
  const initialCardsList = cardsApiData.getCardsApi();

  /** create an array of promises */
  const initialDataPromisesArray = [initialUserProfile, initialCardsList];
  /** getting the promises results of the initial user information and the initial list of cards */
  const allDataPromisesObj = Promise.all(initialDataPromisesArray)
    .then((results) => {
      setInitialOwnerProfile(results[0]);
      setInitialPostCardsList(results[1]);
    });
}


/***************************************************************************/

/****************************   data functions   ***************************/

/**********   cards data   **********/

function setInitialPostCardsList(postCardsListData){
  cardsGallerySection.resetItemsList(postCardsListData);
}

/** return card with extra functionality of popup with image, which contains the card data */
function getCardElementWithPopup({cardData, cardPopup}) {
  const newCard = new SharedCard({
    data: cardData,
    cardTemplateSelector: cardSettings.cardTemplateSelector,
    cardSettings,
    handleCardClick: (cardData) => handleCardPopupClick(cardData, cardPopup)
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


function setInitialOwnerProfile(userProfileApiData) {
  loadProfileInfo({
    name: userProfileApiData.name,
    about: userProfileApiData.about
  });
  loadProfilePicture(userProfileApiData.avatar);
}

function loadProfileInfo(userInfoData) {
  profileSection.resetItems(userInfoData);
  profileDetailsFormSection.resetItems(userInfoData);
}

function loadProfilePicture(profileAvatarSrc) {
  profilePicture.src = profileAvatarSrc;
}

/***************************   forms functions   ***************************/

/** enables forms validation on page loading */
function enableAllFormsValidation() {
  validatableForms.editProfileInfo.enableValidation();
  validatableForms.addCard.enableValidation();
  validatableForms.editProfilePicture.enableValidation();
}

function handleOpenAddCardForm() {
  validatableForms.addCard.resetForm();
  addCardActivePopupForm.openPopup();
};

function handleOpenEditProfileForm() {
  /** load exist data */
  profileDetailsFormSection.handleTextItems();
  validatableForms.editProfileInfo.loadFormData();

  editProfileDetailsActivePopupForm.openPopup();
};

function handleOpenEditProfilePictureForm(){
   /** load exist data */
   profileDetailsFormSection.handleTextItems();
   validatableForms.editProfilePicture.loadFormData();
 
   editProfilePictureActivePopupForm.openPopup();
};

/***************************************************************************/


/****************************   API loading functions   ****************************/

const handleDefaultLoading = (isLoading) => {
  if (isLoad) {
    console.log(`loading is on`);
  } else {
    console.log(`loading is off`);
  }
}

function loadWhileGetApiData({
    ApiObject,
    urlTargetExtension,
    options = {},
    handleGetLoading,
    handleGetResult
  }) {
    loadWhileApiProcess({
      handleProcess: ApiObject.get(urlTargetExtension, options),
      handleLoading: handleGetLoading,
      handleResult: handleGetResult,
      handleError: () => {
        console.log(`ERROR! occurred while getting API data from the server, loading Error: ${err}`);
      }
    });
  };


   





/***************************************************************************/

function editProfile({newUserProfileData, userTargetExtension}){
  /** set new user profile details on the page */
  profileSection.handleTextItems(newUserProfileData);
  /** set new user profile details on the API data */
  usersApiData.updateUserProfile({userExtension: userTargetExtension, newUserProfileData});
}


function addNewPostCardsList(cardsList){
  cardsList.forEach((newCardData) => {
    addNewPostCard(newCardData);
  });
}

function addNewPostCard(newCardData){
   /** add a new card to the server */

   const newPostCardData = cardsApiData.loadWhileApiProcess({
      handleProcess: loadWhileUpdateApiData({
        ApiObj: cardsApiData, 
        extention: defaultCardsExtensions.cards, 
        newData: newCardData
      }),
      handleLoading: () => {
        console.log(`loading is fun`)
      },
      handleResult: (res) => {
        console.log(`watch me:`)
        console.log(res)
        return res;
      },
      handleError: () => {
        console.log(`show me the money`)
        console.log(`ERROR! occurred while API is updating, loading Error: ${err}`);
      }
    });
   

    console.log(newPostCardData);
    // const currentOwnerData = userInfoProfile.getUserInfo();
  
    /** add a new card on the page */
    cardsGallerySection.renderNewItem(newPostCardData);
  
}



  /**  loading process while data is updating in the API and on the page */
  function loadWhileUpdateApiData({ApiObj, extention, newData}){
    debugger;
  
    return ApiObj.post({
      urlTargetExtension: extention,
      bodyItems: newData
    })
    .then((res) => {
      console.log(res);
      debugger;
      ApiObj.patch({
        urlTargetExtension: extention,
        bodyItems: res
      })
    });
  
    debugger;
  
  }  