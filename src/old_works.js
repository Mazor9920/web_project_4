
 /***************************   Event Listeners   ***************************/

 /** Activate Edit Profile Form */
 profileEditButton.addEventListener("click", handleOpenEditProfileForm);
 editProfileForm.addEventListener("submit", handleEditProfileSubmit);
 editProfileCloseButton.addEventListener("click", () => closePopup(editProfilePopup));

 /** Activate Add Card Form */
 addCardButton.addEventListener("click", handleOpenAddCardForm);
 addCardForm.addEventListener("submit", handleAddCardSubmit);
 addCardCloseButton.addEventListener("click", () => closePopup(addCardPopup));

 /************************      functions calls      ************************/

 /** enables forms validation on page loading */
 const validatableForms = [];
 validatableForms.addCard = new FormValidator(formSettings, addCardForm);
 validatableForms.addCard.enableValidation();
 validatableForms.editProfile = new FormValidator(formSettings, editProfileForm);
 validatableForms.editProfile.enableValidation();

 /** enables cards loading on page loading */
 loadDataCards(initialCards);

 /***************************************************************************/


 /************************   functions declarations   ***********************/

 /***********************      Edit Profile Form      ***********************/

 function handleOpenEditProfileForm() {
   loadExistData(editProfileForm, profile);
   validatableForms.editProfile.loadFormData();
   openPopup(editProfilePopup);
 }

 function handleEditProfileSubmit() {
   /** avoid submit after closing form-popup by popup utils (as ESC) */
   if (editProfilePopup.classList.contains(popupSettings.openPopupClass)) {
     editProfileByUzer();
     closePopup(editProfilePopup);
   }
 }

 function editProfileByUzer() {
   const profileData = getSubmissionData(editProfileForm);
   if (profileData) {
     for (const inputElement in profileData) {
       profile.querySelector(`#${inputElement}-input-load-value`).textContent = `${profileData[inputElement]}`;
     }
   }
 }

 /*************************      Add Card Form      *************************/

 function handleOpenAddCardForm() {
   validatableForms.addCard.resetForm();
   openPopup(addCardPopup);
 }

 /** load Card by the uzer */
 function handleAddCardSubmit() {
   /** avoid submit after closing form-popup by popup utils (as ESC) */
   if (addCardPopup.classList.contains(popupSettings.openPopupClass)) {
     addCardByUzer();
     closePopup(addCardPopup);
   }
 }

 /** load Card by the uzer */
 function addCardByUzer() {
   const userCardData = getSubmissionData(addCardForm);
   if (userCardData) {
     createCard(userCardData);
   }
 }

 /*************************      general Forms      *************************/

 function getSubmissionData(formElement) {
   const inputsList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
   const submissionData = inputsList.reduce((fieldData, inputElement) => {
     fieldData[inputElement.name] = inputElement.value;
     return fieldData;
   }, {});
   return submissionData;
 }

 /** shows the existing values of the loadInputsContainer on the input fileds of the formElement */
 function loadExistData(formElement, loadInputsContainer) {
   const inputsList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
   inputsList.forEach((inputElement) => {
     inputElement.value = loadInputsContainer.querySelector(`#${inputElement.id}-load-value`).textContent;
   });
 }

 /**********************************   cards   ******************************/

 /** loads the initial values using the addCard-function for each one of the cards
  * @param {Array.<initialCards>} - an array of cards object
  */
 function loadDataCards(initialCards) {
   initialCards.forEach((cardData) => {
     createCard(cardData);
   });
 }

 function createCard(cardData) {
   const newCard = new PopupCard(cardData, cardSettings.cardTemplateSelector, cardSettings, cardPopupSettings);
   addCardToGallery(newCard.generateCard());
 }

 function addCardToGallery(generatedCard) {
   gallery.prepend(generatedCard);
 }

 /***************************************************************************/



