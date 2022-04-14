class FormValidator {

  constructor(formSettings, formElement) {
    this._formSettings = formSettings;
    this._formElement = formElement;
  }

  /** sets up form functionality, enables form validation */
  enableValidation() {
    this._addTemplateElements();
    this._setEventListeners();
    this._setCustomPlaceholders();
    return this._formElement;
  }

  _addTemplateElements() {
    this._submitButtonElement = this._formElement.querySelector(formSettings.submitButtonSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._formSettings.inputSelector));
  }

  _setCustomPlaceholders() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        this._isEmpty(inputElement))
    });
  }

  _isEmpty(inputElement) {
    !inputElement.value.length >= 1 ? this._unfreezePlaceholder(inputElement) :
      this._freezePlaceholder(inputElement);
  };

  _freezePlaceholder(inputElement) {
    const placeholderElement = this._formElement.querySelector(`.${inputElement.id}-placeholder`);
    placeholderElement.classList.add(this._formSettings.fixedPlaceholderClass);
  };

  _unfreezePlaceholder(inputElement) {
    const placeholderElement = this._formElement.querySelector(`.${inputElement.id}-placeholder`);
    placeholderElement.classList.remove(this._formSettings.fixedPlaceholderClass);
  };

  /** enable or disable forms-submission */
  _setEventListeners() {

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._enableInputsValidation();

    // check button status and inactive it on the first page load
    this._toggleButtonState();
  };

  /** enable or disable form-submission according to the input validation */
  _toggleButtonState() {
    // at least one invalid input
    if (this._hasInvalidInput(this._inputsList)) {
      this._submitButtonElement.classList.add(this._formSettings.inactiveButtonClass);
    } else {
      this._submitButtonElement.classList.remove(this._formSettings.inactiveButtonClass);
    }
  }

  _enableInputsValidation() {
    this._inputsList.forEach((inputElement) => {
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
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /** @returns {boolean} - true if all inputs are valid for submission
   */
  _isSubmissionValid() {
    return !(this._submitButtonElement.classList.contains(formSettings.inactiveButtonClass));
  }

}


class ResetFormValidator extends FormValidator {
  constructor(formSettings, formElement) {
    super(formSettings, formElement);
  }

  /** restores a form element's default values and placeholders, inactive it's submit button */
  _resetForm() {
    this._formElement.reset();

    this._inputsList.forEach((inputElement) => {
      this._unfreezePlaceholder(inputElement);
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}


class ReloadFormValidator extends FormValidator {

  constructor(formSettings, formElement, loadElementsContainer) {
    super(formSettings, formElement);
    this._loadElementsContainer = loadElementsContainer;
  }

  /** shows the existing profile values on the input fileds */
  _loadExistData() {
    this._inputsList.forEach((inputElement) => {
      inputElement.value = this._loadElementsContainer.querySelector(`#${inputElement.id}-load-value`).textContent;
      this._freezePlaceholder(inputElement);
      this._hideInputError(inputElement);
    });
    this._submitButtonElement.classList.add(this._formSettings.inactiveButtonClass);
  }

  _loadUzerInput() {
    this._inputsList.forEach((inputElement) => {
      this._loadElementsContainer.querySelector(`#${inputElement.id}-load-value`).textContent = inputElement.value;
    });
    this._submitButtonElement.classList.add(this._formSettings.inactiveButtonClass);
  }

}