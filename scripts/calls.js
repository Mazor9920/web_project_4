
/************************      functions calls      ************************/


/** enables forms validation on page loading */
const validatableForms = [];
validatableForms.addCard = getValidatableForm(addCardForm);
validatableForms.editProfile = getValidatableForm(editProfileForm);

loadDataCards(initialCards);

/***************************************************************************/
