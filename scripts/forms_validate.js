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

// The function takes an array of form fields
// and returns true if at least one field is invalid,
// and returns false if all of them are valid.
// The hasInvalidInput() function only checks for an invalid field
// and signals whether the "Submit" button can be unlocked.
// But it doesn't modify the "Submit" button itself.
const hasInvalidInput = (inputList) => {
  // iterate over the array using the some() method
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    return !inputElement.validity.valid;
  })
};


// function to control if the button is active or not
// The function takes an array of input fields
// and the button element, whose state you need to change
// check all of the fields to know when the button should be active.
// If all of our fields are valid - make the button active,
// but if at least one is not valid - disable it.
const toggleButtonState = (inputList, buttonElement) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    buttonElement.classList.add("form__submit-button_disabled");
  } else {
    // otherwise, make it active
    buttonElement.classList.remove("form__submit-button_disabled");
  }
};

const setEventListeners = (formElement) => {
  // Find all the form fields and make an array of them
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // Find the submit button in the current form
  const buttonElement = formElement.querySelector(".form__submit-button");

  // check the button's active status on the first page load,
  // and make it inactive until data is input to any of the fields.
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);

      // pass an array of form fields and the button to it
      // This will check the button's status upon every input change in any of the fields.
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {

  // DEBUG:
  // console.log(settings);

  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // DEBUG:
  // console.log(formList);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    // setEventListeners(formElement, settings);
  });
};

// enabling forms validation
// accepts all the settings by configuration object
// which contains class names and class selectors
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible"
});
