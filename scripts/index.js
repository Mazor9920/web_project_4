/***************************************************************************/

/************************   functions declarations   ***********************/

/**********************************   forms   ******************************/



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



class PopupCardByUzer extends PopupCard {

}


class PopupCardByData extends PopupCard {

}



/** loads the initial values using the addCard-function for each one of the cards
 * @param {Array.<CaritialCards - an array of cards object
 */
function loadDataCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardByData = createCardByData(cardData);
    cardByData._addCardToGallery(gallery);
  });
}

function createCardByData(cardData) {
  return createCard(cardData);
}

function getUserCardData(addCardForm) {
  const inputCardData = {};
  const inputCardNameElement = addCardForm.querySelector(cardSettings.inputCardNameSelector);
  const inputCardLinkElement = addCardForm.querySelector(cardSettings.inputCardLinkSelector);

  inputCardData.name = inputCardNameElement.value;
  inputCardData.link = inputCardLinkElement.value;
  return inputCardData;
}

function createCardByUzer(addCardForm) {
  const userCardData = getUserCardData(addCardForm);
  const cardByUser = createCard(userCardData);
  return cardByUser;
}

function createCard(cardData) {
  const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
  newCard.generateCard();
  return newCard;
}

/***************************************************************************/
