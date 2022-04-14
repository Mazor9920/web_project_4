/***************************************************************************/
//
// import {
//   Card as Card,
//   PopupCard as PopupCard
// } from "./classes/Card.js";
//
// import {
//   FormValidator as FormValidator,
//   ResetFormValidator as ResetFormValidator,
//   ReloadFormValidator as ReloadFormValidator
// } from "./classes/FormValidator.js";

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

/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<initialCards>} - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardByData = createCard(cardData);
    cardByData._addCardToGallery(gallery);
  });
}

function createCard(cardData) {
  const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
  newCard.generateCard();
  return newCard;
}

function loadCardByUzer(userCardValidInputsList) {
  const userCardData = [];
  userCardData.name = userCardValidInputsList[`card-name-input`];
  userCardData.link = userCardValidInputsList[`card-link-input`];
  const cardByUser = createCard(userCardData);
  cardByUser._addCardToGallery(gallery);
}

/************************   add-card-form popup   ************************/

/** edits the card values by the user input */
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  // const uzerCardForm = evt.target;
  // const inputCard = getCardByUzer(uzerCardForm);
  if (`_validInputsList` in validatableForms.addCard){
    const userCardValidInputsList = validatableForms.addCard._validInputsList;
    loadCardByUzer(userCardValidInputsList);
  }

  closePopup(addCardPopup);
}

/***************************************************************************/

/************************      functions calls      ************************/

/** enables forms validation on page loading */
const validatableForms = [];
validatableForms.addCard = getValidatableForm(addCardForm);
validatableForms.editProfile = getValidatableForm(editProfileForm);

loadDataCards(initialCards);

/***************************************************************************/
