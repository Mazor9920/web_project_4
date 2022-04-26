/***************************************************************************/

/** Contain all the global constant,
 *  configuration settings objects which their values depend on the HTML file
 *
 * @module constants
 */

/***************************************************************************/


/** stores selectors and classes for form Class */
const formSettings = {
  formSelector: `.form`,
  inputSelector: `.form__input`,
  submitButtonSelector: `.form__submit-button`,
  inactiveButtonClass: `form__submit-button_disabled`,
  inputErrorClass: `form__input_type_error`,
  errorClass: `form__input-error_visible`,
  fixedPlaceholderClass: `form__placeholder_is-fixed`,
  closeButtonSelector: `.popup__close-button`
};

/** stores selectors and classes for Card Class */
const cardSettings = {
  cardSelector: `.card`,
  cardTemplateSelector: `.template_card`,
  inputCardNameSelector: `.form__input_value_card-name`,
  inputCardLinkSelector: `.form__input_value_card-link`,
  cardTitleSelector: `.card__title`,
  cardPictureSelector: `.card__picture`,
  cardLikeButtonSelector: `.card__like-button`,
  cardLikeButtonActiveClass: "card__like-button_active",
  cardDeleteButtonSelector: `.card__delete-button`,
  inputCardNameID: `card-name-input`,
  inputCardLinkID: `card-link-input`,
  cardsContainerSelector: `#gallery`
}

/** stores selectors and classes for PopupCard Class */
// const cardPopupSettings = {
//   cardPopupSelector: `#card-popup`,
//   cardPopupCloseButtonSelector: `.popup__close-button_placed_card-popup`,
//   cardPopupNameSelector: `.popup__picture-details`,
//   cardPopupLinkSelector: `.popup__close-up-picture`
// }

/***************************************************************************/

/** stores selectors and classes for Popup Class */
const popupSettings = {
  openPopupClass: `popup_opened`,
  openPopupSelector: `.popup_opened`,
  closeButtonSelector: `.popup__close-button`
}
/**   Popup class Extensions */

/** PopupWithForm */
const popupFormSettings = {
  popupFormSelector: `popup__form`,
  popupFormInputSelector: `.form__input`
}
/** PopupWithImage */
const popupImageSettings = {
  popupImageSelector: `.popup__close-up-picture`,
  popupImageCaprionSelector: `.popup__picture-details`
}

/***************************************************************************/

export {
  formSettings,
  cardSettings,
  // cardPopupSettings,
  popupSettings,
  popupFormSettings,
  popupImageSettings
};
