/***************************************************************************/

/*************************   form-validation functions  *************************/

const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(settings, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

/** iterate over inputs array using the some() method
 * @param {Array.<inputElement>} inputList - an array of input Elements
 * @returns {boolean} - true if at least one input field is invalid
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/** enable or disable form-submission according to the input validation
 * @param {Array.<inputElement>} inputList - an array of input Elements
 * @param buttonElement - button to control if is active or not
 */
const toggleButtonState = (settings, inputList, buttonElement) => {
  // at least one invalid input
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

/** enable or disable forms-submission */
const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  // submit button in the current form
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  // check button status and inactive it on the first page load
  toggleButtonState(settings, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(settings, formElement, inputElement);
      // check the button's status upon every input change in any of the inputs
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};

/** restores a form element's default values and placeholders, inactive it's submit button */
function resetCardForm(settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  formElement.reset();

  inputList.forEach((inputElement) => {
    unfreezePlaceholder(formElement, inputElement);
    hideInputError(settings, formElement, inputElement);
  });

  toggleButtonState(settings, inputList, buttonElement);
}

/** enables forms validation
 * @param {Object} settings - configuration object of form which contains generals classes and selectors names
 */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(settings, formElement);
  });
};

/** A Form configuration object */
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible"
};

/************************      functions calls      ************************/

/** enables forms validation on page loading
 * @param {Object} settings - configuration object of form which contains generals classes and selectors names
 */
enableValidation(settings);

/***************************************************************************/
