/***************************************************************************/

/** FormValidator class
 * Contain FormValidator class which sets settings for validating form fields.
 * It has private methods for processing the form,
 * and a public method¬†enableValidation(), which enables form validation.
 *
 * @module FormValidator
 */

/***************************************************************************/

export default class FormValidator {

  constructor(formSettings, formElement) {
    this._formSettings = formSettings;
    this._formElement = formElement;
  }

  /** sets up form functionality, enables form validation */
  enableValidation() {
    this._addFormElements();
    this._enableSubmitValidation();
    this._setCustomPlaceholders();
  }

  _addFormElements() {
    this._submitButtonElement = this._formElement.querySelector(this._formSettings.submitButtonSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._formSettings.inputSelector));
  }

  /** enable or disable forms-submission */
  _enableSubmitValidation() {

    this._enableInputsValidation();

    // inactive the submit button on the first page load
    this._disableSubmit();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  _setCustomPlaceholders() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        this._togglePlaceholder(inputElement))
    });
  }

  _togglePlaceholder(inputElement) {
    if (!inputElement.value.length >= 1) {
      this._unfreezePlaceholder(inputElement)
    } else {
      this._freezePlaceholder(inputElement)
    }
  };

  _freezePlaceholder(inputElement) {
    const placeholderElement = this._formElement.querySelector(`.${inputElement.id}-placeholder`);
    placeholderElement.classList.add(this._formSettings.fixedPlaceholderClass);
  };

  _unfreezePlaceholder(inputElement) {
    const placeholderElement = this._formElement.querySelector(`.${inputElement.id}-placeholder`);
    placeholderElement.classList.remove(this._formSettings.fixedPlaceholderClass);
  };

  /** enable or disable form-submission according to the input validation */
  _toggleSubmitButtonState() {
    // at least one invalid input
    if (this._hasInvalidInput(this._inputsList)) {
      this._disableSubmit();
    } else {
      this._ableSubmit();
    }
  }

  _disableSubmit() {
    this._submitButtonElement.classList.add(this._formSettings.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  };

  _ableSubmit() {
    this._submitButtonElement.classList.remove(this._formSettings.inactiveButtonClass);
    this._submitButtonElement.disabled = false;
  };

  _enableInputsValidation() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // checking the field's validity
        this._checkInputValidity(inputElement);
        // check the button's status upon every input change in any of the inputs
        this._toggleSubmitButtonState();
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
   * @returns {boolean} - true¬†if at least one input field is invalid
   */
  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /***************************   public methods:   ***************************/

  /** restores a form element's default values and placeholders,
  inactive it's submit button */
  resetForm() {
    this._formElement.reset();

    this._inputsList.forEach((inputElement) => {
      this._unfreezePlaceholder(inputElement);
      this._hideInputError(inputElement);
    });

    /** inactive submit button after reset */
    this._disableSubmit();

  }

  /** Initializes the placeholders status of a data-filled form-values,
  inactive it's submit button */
  loadFormData() {
    this._inputsList.forEach((inputElement) => {
      this._freezePlaceholder(inputElement);
      this._hideInputError(inputElement);
    });
    /** inactive submit button on form-opening */
    this._disableSubmit();
  }

}


/***************************************************************************/
