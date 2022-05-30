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

import {
  defaultUserProfile,
  myUserProfile
} from "../scripts/data/userProfile.js";

import {
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
import {
  Post,
  createPost
} from "../scripts/components/Post/Post.js";
import {
  PostOwner,
  createPostOwner
} from "../scripts/components/PostOwner/PostOwner.js";
import {
  LikesTracker,
  createLikesTracker
} from "../scripts/components/LikesTracker/LikesTracker.js";


// import testProjectTasks from "./test";

/***************************************************************************/



/************************   DOM Elements Selecting   ***********************/

const content = document.querySelector("#content");

/** profile */
const profile = content.querySelector("#profile");
const addCardButton = profile.querySelector(".profile__add-button");
const profileInfo = profile.querySelector(".profile__info");
const profilePicture = profileInfo.querySelector(`#avatar-profile-load-value`);
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
const editProfileDetailsSaveButton = editProfileForm.querySelector(".form__submit-button");
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

const baseUrlByGroup = `${myAuthorizationData.baseUrl}/${myAuthorizationData.myGroupID}`;
const defaultHeaders = {
  authorization: myAuthorizationData.myToken,
  'Content-type': 'application/json',
};
const defaultOptions = {
  baseUrl: baseUrlByGroup,
  headers: defaultHeaders
};

const allPageApiData = new Api(defaultOptions);

const usersApiData = new UsersApi({
  extensions: defaultUsersExtensions,
  options: defaultOptions
});

const cardsApiData = new CardsApi({
  extensions: defaultCardsExtensions,
  options: defaultOptions
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

      const newCardPostElement = getPostCardByPostData(postCardDataItem);
        

      cardsGallerySection.addItemToBeginning(newCardPostElement);
        

    }
  },
  containerSelector: `#gallery`
});


/** for adding Post prototype to the new card element */
function getPostCardByPostData(postCardData) {
  
  const cardData = {
    name: postCardData.name,
    link: postCardData.link
  };


  const postCard = createPost({

    likes: createLikesTracker(postCardData.likes),
    _id: postCardData._id,
    createdAt: postCardData.createdAt,
    ownerData: createPostOwner(postCardData.owner),
    postData: cardData
  });

  const newPostCardElement = getSharedCardWithPopup({
    cardData: postCard,
    cardPopup: closeUpCardPopup
  });

    
  return newPostCardElement;
}



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
  isInputForm: true,
  processSubmit: (newCardData) => {
     
    addNewPostCardByUserInput(newCardData);
    validatableForms.addCard.resetForm();
  },
});


const editProfileDetailsActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-form-popup`,
  processSubmit: (newProfileData) => {
     
    editProfileDetailsByUserInput(newProfileData);
    validatableForms.editProfileInfo.resetForm();
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
    // SharedCard.prototype.deleteForSure();
    deleteCardPopupActiveForm.__proto__.aboutToDelete.deleteForSure();
  },
});

const editProfilePictureActivePopupForm = new PopupWithForm({
  popupSelector: `#edit-profile-picture-form-popup`,
  processSubmit: (newUserAvatarData) => {
    console.log(`evt`);
    debugger;

    // {userExtension, newAvatar}
    editProfilePictureByUserInput(newUserAvatarData) 

    // .__proto__.
  },
});


/***************************   Event Listeners   ***************************/

addCardButton.addEventListener("click", handleOpenAddCardForm);
profileEditButton.addEventListener("click", handleOpenEditProfileForm);
profilePicture.addEventListener("click", handleOpenEditProfilePictureForm);

/***************************************************************************/

/***************************   Functions calls   ***************************/


 
enableAllFormsValidation();

handleOwnerPageLoading(defaultUsersExtensions.owner);

debugger; 

// testProjectTasks();

/***************************************************************************/

/************************   Functions declerations   ***********************/

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

function handleOpenEditProfilePictureForm() {
  /** load exist data */
  profileDetailsFormSection.handleTextItems();
  validatableForms.editProfilePicture.loadFormData();

  editProfilePictureActivePopupForm.openPopup();
};

/***************************************************************************/

/************************   Data Loading functions   ************************/

/**********   cards data   **********/

function setInitialPostCardsList(postCardsListData) {
  cardsGallerySection.resetItemsList(postCardsListData);
}

/** return card with extra functionality of popup with image, which contains the card data */
function getSharedCardWithPopup({
  cardData,
  cardPopup
}) {

  // debugger;
// isOwnerCard problem - delete btn

  const newSharedCard = new SharedCard({
    data: cardData,
    cardTemplateSelector: cardSettings.cardTemplateSelector,
    cardSettings,
    handleCardClick: (cardData) => handleCardPopupClick(cardData, cardPopup),
    likesCounter: cardData.likes.likes.length,
    isOwnerCard: cardData.isOwnerCard,
    ownerID: cardData.owner._id,
    cardID: cardData._id,
    // likes: createLikesTracker(cardData.likes),
    // userID: cardData._id,
  });

    


  return newSharedCard.generateCard();
};

SharedCard.prototype.requestLikeAction = ({isLikedByUser, cardID}) => {
  isLikedByUser ? cardsApiData.likeCard(cardID) : cardsApiData.dislikeCard(cardID);
}


/** presents the closeUpCardPopup when the user trigger its opening */
function handleCardPopupClick(cardData, popupWithCard) {
  popupWithCard.openPopup({
    link: cardData.link,
    caption: cardData.name
  });
}

/**********   profile data   **********/

function setInitialOwnerProfile(userProfileApiData) {
  loadProfileInfo
  ({
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

/****************************   API functions   ****************************/

/** load initial API data on page loading - profile and cards  */
function loadInitialDataPage(userExtension) {
   
  /** get initial data from the server */
  const initialUserProfile = usersApiData.getUserProfile(userExtension);
  const initialCardsList = cardsApiData.getCardsApi();
  

  debugger;

  /** create an array of promises */
  const initialPromisesDataArray = [initialUserProfile, initialCardsList];
  /** getting the promises results of the initial user information and the initial list of cards */
  const allPromisedPagaData = Promise.all(initialPromisesDataArray);
  return allPromisedPagaData;
}

function handleOwnerPageLoading(ownerExtension) {
   debugger;
  content.style.backgroundColor = 'none';

  // Loading users & cards information from the server
  allPageApiData.loadWhileApiProcess({
    handleWhileProcess: (isLoading) => {
      if (isLoading) {
        // document opacity - to add class content_hidden
        content.style.backgroundColor = 'red';
      } else {
        content.style.backgroundColor = '';
      }
    },
    handleProcess: 
      loadInitialDataPage(ownerExtension)
    ,
    handleResult: (allInitialPageData) => {
      setInitialOwnerProfile(allInitialPageData[0]);
      setInitialPostCardsList(allInitialPageData[1]);
    },
    handleError: (err) => {
      console.log(`ERROR! occurred while loading page: ${err.message}`);
    }
  });

}


/***************************************************************************/

/** edit existing owner-profile on the server */
function editProfileDetailsByUserInput(newUserProfileData) {
  usersApiData.loadWhileApiProcess({
    handleWhileProcess: (isProfileUpdating) => {
      /** inform the user while updating profile details */
      informUserWhileProcessByNoteElement({
        isLoading: isProfileUpdating, 
        defaultNote: `Save`, 
        tempNote: `Saving...`, 
        noteElement: editProfileDetailsSaveButton
      })
    }, 
    handleProcess: 
    /** set new user profile details on the API data */
    usersApiData.updateUserProfile({
      userExtension: defaultUsersExtensions.owner,
      newUserProfileData
     })
    ,
    handleResult: (newUserProfileData) => {
       
      /** set new user profile details on the page */
      profileSection.handleTextItems(newUserProfileData);
    },
    handleError: (err) => {
      console.log(`ERROR! occurred while updating user profile: ${err.message}`);
    }
  });


}


// function addNewPostCardsList(cardsList) {
//   cardsList.forEach((newCardData) => {
//     addNewPostCard(newCardData);
//   });
// }

/** add a new user card to the server */
function addNewPostCardByUserInput(newCardData) {
   
   
  cardsApiData.loadWhileApiProcess({
    // newCardData,
    handleWhileProcess: (isPostLoading) => {
      /** inform the user while loading a new post card */
      informUserWhileProcessByNoteElement({
        isLoading: isPostLoading, 
        defaultNote: `Create`, 
        tempNote: `Saving...`, 
        noteElement: addCardCreateButton
      })
    },
    handleProcess: 
    cardsApiData.postNewCardOnServer(newCardData),
    handleResult: (newPostCardData) => {

      debugger;
      newPostCardData.isOwnerCard = true;
      console.log(newPostCardData);

      /** add a new post card on the page */
      cardsGallerySection.renderNewItem(newPostCardData);
    },
    handleError: (err) => {
      console.log(`ERROR! occurred while Cards API is loading, Error: ${err}`);
    }
  });

}

/** notifies the user of a process that may take time, using a temporary text of an element */
function informUserWhileProcessByNoteElement({isLoading, defaultNote, tempNote, noteElement}) {
  const note = (isLoading) ? tempNote : defaultNote;
  noteElement.textContent = note;
}


function editProfilePictureByUserInput(newUserAvatarData) {

  debugger;
  // {userExtension, newAvatar}

  usersApiData.loadWhileApiProcess({
    handleWhileProcess : (isPictureUpdating) => {
      /** inform the user while updating profile picture */
      informUserWhileProcessByNoteElement({
        isLoading: isPictureUpdating, 
        defaultNote: `Save`, 
        tempNote: `Saving...`, 
        noteElement: editProfilePictureSaveButton
      })
    }, 
    handleProcess: 
      /** set new user profile picture on the API data */
      usersApiData.updateUserPicture({userExtension, newAvatar}),
    handleResult: (newAvatar) => {
      /** set new user profile picture on the page */
      loadProfilePicture(getUserSrcPicture(userExtension));
    },
    handleError: (err) => {
      console.log(`ERROR! occurred while updating user profile picture: ${err.message}`);
    }
  });
}


