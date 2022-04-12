/***************************************************************************/

/************************       DOM selecting       ************************/

const content = document.querySelector("#content");

/** profile Elements */
const profile = content.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDetails = profileInfo.querySelector(".profile__details");

/** edit-profile popup Elements */
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
const editProfileCloseButton = editProfilePopupContainer.querySelector(".popup__close-button");
const editProfileForm = editProfilePopupContainer.querySelector(".popup__form");

const editProfileFormTitle = editProfileForm.querySelector(".form__title");
const editProfileSaveButton = editProfileForm.querySelector(".form__submit-button");
/** user input fields */
const profileNameInput = editProfileForm.querySelector(".form__input_value_profile-name");
const profileJobInput = editProfileForm.querySelector(".form__input_value_profile-job");

/** gallery Elements */
const gallery = content.querySelector(".gallery");
/** card-template Elements */

// const cardTemplate = document.querySelector("#card-template");
const cardTemplate = document.querySelector(".template_card");


const cardElement = cardTemplate.querySelector('.card');

/** add-card popup Elements */
const addCardPopup = document.querySelector("#add-card-popup");
const addCardPopupContainer = addCardPopup.querySelector(".popup__container");
const addCardCloseButton = addCardPopupContainer.querySelector(".popup__close-button");
const addCardForm = addCardPopupContainer.querySelector(".popup__form");

const addCardFormTitle = addCardForm.querySelector(".form__title");
const addCardCreateButton = addCardForm.querySelector(".form__submit-button");

// /** card popup Elements */
const cardPopup = document.querySelector("#card-popup");
const cardPopupContainer = cardPopup.querySelector(".popup__container_value_card-popup");
const cardPopupCloseButton = cardPopupContainer.querySelector(".popup__close-button_placed_card-popup");
const cardCloseUpPicture = cardPopupContainer.querySelector(".popup__close-up-picture");
const cardPictureDetails = cardPopupContainer.querySelector(".popup__picture-details");

/***************************************************************************/

/***************************************************************************/

/************************   functions declarations   ***********************/

/*********************************   cards   *****************************/



const cardSettings = {
  cardTemplateSelector : `.template_card`,
  inputCardNameSelector : `.form__input_value_card-name`,
  inputCardLinkSelector : `.form__input_value_card-link`,
  cardSelector : `.card`,
  cardTitleSelector : `.card__title`,
  cardPictureSelector : `.card__picture`,
  cardLikeButtonSelector : `.card__like-button`,
  cardLikeButtonActiveClass : "card__like-button_active",
  cardDeleteButtonSelector : `.card__delete-button`,
  cardPopupSelector : `#card-popup`,
  cardPopupCloseButtonSelector : `.popup__close-button_placed_card-popup`,
  cardPopupNameSelector : `.popup__picture-details`,
  cardPopupLinkSelector : `.popup__close-up-picture`
}


/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<CaritialCards - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    createDataCard(cardData);
  });
}

function createDataCard(cardData) {
  const cardByData = createCard(cardData);
  cardByData._addCardToGallery(gallery);
}



function getUserCardData(addCardForm) {
  const inputCardData = {};
  const inputCardNameElement = addCardForm.querySelector(cardSettings.inputCardNameSelector);
  const inputCardLinkElement = addCardForm.querySelector(cardSettings.inputCardLinkSelector);

  inputCardData.name = inputCardNameElement.value;
  inputCardData.link = inputCardLinkElement.value;
  return inputCardData;
}


function createUzerCard(addCardForm) {
  const userCardData = getUserCardData(addCardForm);
  return createCard(userCardData);
}

function createCard(cardData) {
  const newCard = new Card(cardData, cardSettings.cardTemplateSelector, cardSettings);
  return newCard;
}



/***************************************************************************/

/************************      functions calls      ************************/


loadDataCards(initialCards);

/***************************************************************************/
