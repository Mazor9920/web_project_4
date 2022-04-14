/*************************   form-activation functions  *************************/

const isEmpty = (formElement, inputElement) => {
  !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) :
    freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.add('form__placeholder_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.remove('form__placeholder_is-fixed');
};

const setCustomPlaceholders = (formElement) => {
  const getInputList = Array.from(formElement.querySelectorAll(`.form__input`));
  getInputList.forEach((inputElement) => inputElement
    .addEventListener('input', () => isEmpty(formElement, inputElement)))
};

const activateForms = () => {
  const getFormList = Array.from(document.querySelectorAll(`.form`));
  getFormList.forEach((formElement) => {
    setCustomPlaceholders(formElement);
  });
};


activateForms();
