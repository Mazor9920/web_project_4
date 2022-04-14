 // @param {Array.<inputElement>} inputList - an array of input Elements
 // @param buttonElement - button to control if is active or not

 class FormValidator {

   constructor(formSettings, formElement) {
     this._formSettings = formSettings;
     this._formElement = formElement;
     this._submitButtonElement = formElement.querySelector(formSettings.submitButtonSelector);
     this._inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
   }

   /** sets up form functionality, enables form validation */
   enableValidation() {
     this._setEventListeners();
   }

   /** enable or disable forms-submission */
   _setEventListeners() {

     this._formElement.addEventListener("submit", (evt) => {
       evt.preventDefault();
     });

     // check button status and inactive it on the first page load
     this._toggleButtonState();

     this._enableInputsValidation();

   };

   /** enable or disable form-submission according to the input validation */
   _toggleButtonState() {
     // at least one invalid input
     if (this._hasInvalidInput(this._inputList)) {
       this._submitButtonElement.classList.add(this._formSettings.inactiveButtonClass);
     } else {
       this._submitButtonElement.classList.remove(this._formSettings.inactiveButtonClass);
     }
   }

   _enableInputsValidation() {
     this._inputList.forEach((inputElement) => {
       inputElement.addEventListener("input", () => {
         // checking the field's validity
         this._checkInputValidity(inputElement);
         // check the button's status upon every input change in any of the inputs
         this._toggleButtonState();
       });
     });
   }

   _checkInputValidity(inputElement) {
     if (!inputElement.validity.valid) {
       this._showInputError(inputElement, inputElement.validationMessage);
     } else {
       this._hideInputError(inputElement);
     }
   }



   _showInputError(inputElement, errorMessage) {
     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
     inputElement.classList.add(this._formSettings.inputErrorClass);
     errorElement.textContent = errorMessage;
     errorElement.classList.add(this._formSettings.errorClass);
   };

   _hideInputError(inputElement) {
     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
     inputElement.classList.remove(this._formSettings.inputErrorClass);
     errorElement.classList.remove(this._formSettings.errorClass);
     errorElement.textContent = "";
   };

   /** iterate over inputs array using the some() method
    * @returns {boolean} - true if at least one input field is invalid
    */
   _hasInvalidInput() {
     return this._inputList.some((inputElement) => {
       return !inputElement.validity.valid;
     });
   }



 }


class DefultInputFormValidator extends FormValidator {}

class AddCardFormValidator extends FormValidator {

     /** restores a form element's default values and placeholders, inactive it's submit button */
     // resetFormInputs(formElement) {
     // this.element = formElement;
     resetCardForm(formSettings, cardFormElement) {
       this._element = new FormValidator(formSettings, cardFormElement);

       this._formElement.reset();

       this._inputList.forEach((inputElement) => {
         unfreezePlaceholder(inputElement);
         this._hideInputError(inputElement);
       });

       this._toggleButtonState();
     }
}
class EditProfileFormValidator extends FormValidator {

  /** shows the existing profile values on the input fileds */
  function loadProfile() {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDetails.textContent;

    freezePlaceholder(editProfileForm, profileNameInput);
    freezePlaceholder(editProfileForm, profileJobInput);

    // editProfileForm._hideInputError(profileNameInput);
    // editProfileForm._hideInputError(profileJobInput);
    editProfileSaveButton.classList.add(formSettings.inactiveButtonClass);
  }

}
