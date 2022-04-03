/*************************   form-validation functions  *************************/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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
const toggleButtonState = (inputList, buttonElement) => {
  // at least one invalid input
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit-button_disabled");
  } else {
    buttonElement.classList.remove("form__submit-button_disabled");
  }
};

/** enable or disable forms-submission */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // submit button in the current form
  const buttonElement = formElement.querySelector(".form__submit-button");

  // check button status and inactive it on the first page load
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      // check the button's status upon every input change in any of the inputs
      toggleButtonState(inputList, buttonElement);
    });
  });
};


/** enables forms validation
 * @param {Object} settings - configuration object which contains generals classes and selectors names
 */
 const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible"
});
