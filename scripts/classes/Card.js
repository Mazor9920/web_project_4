/***************************************************************************/

/** Card class
 * Contain Card class which creates a card with text and an image link
 * It has private methods for working with markup, adding event listeners,
 * and preparing the card for display.
 * It has one public method generateCard(),that returns
 * a fully functional card element populated with data. with attached event listeners.
 *
 * It has 1 extension:
 * PopupCard - for creating a card that has it's own attached popup modal window
 *
 * @module Card
 */

/***************************************************************************/

import {
  popupSettings,
  openPopup,
  closePopup,
  handleFocusOutPopup,
  handleEscPopup
} from "../utils.js";

/***************************************************************************/


class Card {

  constructor(data, cardTemplateSelector, cardSettings) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSettings = cardSettings;
  }

  /** sets up card markup */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSettings.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  /** sets up card content and functionality */
  generateCard() {

    this._element = this._getTemplate();

    this._addTemplateElements();
    this._setCardContent();
    this._setEventListeners();

    return this._element;
  }

  _addTemplateElements() {
    this._cardTitle = this._element.querySelector(this._cardSettings.cardTitleSelector);
    this._cardPicture = this._element.querySelector(this._cardSettings.cardPictureSelector);
    this._cardLikeButton = this._element.querySelector(this._cardSettings.cardLikeButtonSelector);
    this._cardDeleteButton = this._element.querySelector(this._cardSettings.cardDeleteButtonSelector);
  }

  _setCardContent() {
    this._cardTitle.textContent = this._name;
    this._cardPicture.src = this._link;
    this._cardPicture.alt = `picture of ${this._name}`;
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLikeClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });

  }

  _handleCardLikeClick() {
    this._cardLikeButton.classList.toggle(this._cardSettings.cardLikeButtonActiveClass);
  }

  _handleCardDelete() {
    this._cardDeleteButton.closest(this._cardSettings.cardSelector).remove();
  }


}

/***************************************************************************/

class PopupCard extends Card {

  constructor(data, cardTemplateSelector, cardSettings, cardPopupSettings) {
    super(data, cardTemplateSelector, cardSettings);
    this._cardPopupSettings = cardPopupSettings;
  }

  _addTemplateElements() {
    super._addTemplateElements();
    this._cardPopup = document.querySelector(this._cardPopupSettings.cardPopupSelector);
    this._cardPopupCloseButton = this._cardPopup.querySelector(this._cardPopupSettings.cardPopupCloseButtonSelector);
    this._cardPopupName = this._cardPopup.querySelector(this._cardPopupSettings.cardPopupNameSelector);
    this._cardPopupLink = this._cardPopup.querySelector(this._cardPopupSettings.cardPopupLinkSelector);
  }

  _setEventListeners() {
    super._setEventListeners();

    this._cardPicture.addEventListener("click", () => {
      this._handleOpenCardPopup();
    });

    this._cardPopupCloseButton.addEventListener("click", () => {
      this._handleCloseCardPopup();
    });
  }

  /** opens a popup-card which contain close-up and description
  of a specific clicked-image */
  _handleOpenCardPopup() {
    this._setPopupCardContent();
    openPopup(this._cardPopup);
  }

  _setPopupCardContent() {
    this._cardPopupName.textContent = this._name;
    this._cardPopupLink.src = this._link;
    this._cardPopupLink.alt = `close up picture of ${this._name}`;
  }

  _handleCloseCardPopup() {
    closePopup(this._cardPopup);
  }

}

/***************************************************************************/

export {
  Card,
  PopupCard
};
