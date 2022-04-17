/***************************************************************************/

/** Contain all the global constant, caseonfiguration settings objects
 *
 * @module constants
 */

/***************************************************************************/


/** stores selectors and classes for form Class */
const formSettings = {
  formSelector: `.form`,
  formPopupClass: `.popup`,
  inputSelector: `.form__input`,
  submitButtonSelector: `.form__submit-button`,
  inactiveButtonClass: `form__submit-button_disabled`,
  inputErrorClass: `form__input_type_error`,
  errorClass: `form__input-error_visible`,
  fixedPlaceholderClass: `form__placeholder_is-fixed`
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
const cardPopupSettings = {
  cardPopupSelector: `#card-popup`,
  cardPopupCloseButtonSelector: `.popup__close-button_placed_card-popup`,
  cardPopupNameSelector: `.popup__picture-details`,
  cardPopupLinkSelector: `.popup__close-up-picture`
}

/***************************************************************************/

export{
  formSettings,
  cardSettings,
  cardPopupSettings
};
