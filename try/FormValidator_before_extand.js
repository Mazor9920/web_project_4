// sets settings for validating form

errorElement

buttonElement

class InputFormValidator extends FormValidator {
  constructor(formSettings, formElement) {
    super(formSettings, formElement);
    this._inputList =
    this._image = 
  }
}

class FormValidator {

  constructor(formSettings, formElement) {
    this._formSettings = formSettings;
    this._formElement = formElement;
  }

  /** sets up form functionality, enables form validation */
  enableValidation() {
    this._formElement._setEventListeners();
  }


  // _addCardToGallery(gallerySelector) {
  //   gallerySelector.prepend(this.generateCard());
  // }

  /** enable or disable forms-submission */
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formSettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._formSettings.submitButtonSelector);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // check button status and inactive it on the first page load
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // checking the field's validity
        this._checkInputValidity(inputElement);
        // check the button's status upon every input change in any of the inputs
        this._toggleButtonState(inputList, buttonElement);
      });
    });


  };


  /** enable or disable form-submission according to the input validation
   * @param {Array.<inputElement>} inputList - an array of input Elements
   * @param buttonElement - button to control if is active or not
   */
  _toggleButtonState(inputList, buttonElement) {
    // at least one invalid input
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formSettings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._formSettings.inactiveButtonClass);
    }
  }


  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }


  /** restores a form element's default values and placeholders, inactive it's submit button */
  resetCardForm() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formSettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._formSettings.submitButtonSelector);

    this.reset();

    inputList.forEach((inputElement) => {
      unfreezePlaceholder(inputElement);
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList, buttonElement);
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
   * @param {Array.<inputElement>} inputList - an array of input Elements
   * @returns {boolean} - true if at least one input field is invalid
   */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }






}

// const formSettings = {
//   formSelector: ".form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".form__submit-button",
//   inactiveButtonClass: "form__submit-button_disabled",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__input-error_visible"
// };
