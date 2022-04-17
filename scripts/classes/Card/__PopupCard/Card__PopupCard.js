/***************************************************************************/

/** PopupCard class - extension of Card class
 * Contain PopupCard class which use Card class to create a special card
 * that has it's own attached popup modal window.
 *
 * It has private methods for working with markup, adding event listeners,
 * and preparing the card for display.
 * It has one public method generateCard(),that returns
 * a fully functional card element populated with data. with attached event listeners.
 *
 * @module PopupCard
 */

/***************************************************************************/

import {
  popupSettings,
  openPopup,
  closePopup,
  handleFocusOutPopup,
  handleEscPopup
} from "../../../utils/utils.js";


import {
  Card
} from "../Card.js";

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
  PopupCard
};
