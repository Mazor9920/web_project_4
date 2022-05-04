/***************************************************************************/

/** Popup class
 * handle the functionality of modal-windows (popups) elements.
 * It stores methods which opens/closes popup under certain conditions.
 *
 * Includes public methods:
 * open() , close()  - for opening/closing a popup element
 * setEventListeners() which uses event listeners to trigger this functionality,
 * such as closing the popup by pressing its close icon.
 *
 * Includes private methods which designed to maximize the user experience,
 * and allow more flexible ways to close the popup window.
 *
 * It has 2 extension for setting the functionality of special popups:
 * PopupWithImage - for a popup that contain image and its caption
 * PopupWithForm - for a popup that contain a form
 *
 * @module Popup
 */

/***************************************************************************/

import {
  popupSettings
} from "../../utils/constants.js";

/***************************************************************************/



export default class Popup {
  /**
   * Create a Popup.
   * @param {string} popupSelector - a CSS class selector of the popup element.
   */
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButtonElement = this._popupElement.querySelector(popupSettings.closeButtonSelector);
    /** bind() method used to prevent loosing 'this' when a function is used as a callback */
    this.closePopup = this.closePopup.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleFocusOutPopup = this._handleFocusOutPopup.bind(this);
  }

  /** allows the users to close an open popup by pressing the Esc key */
  _handleEscClose(evt) {
    const pressedKey = evt.key;
    if (pressedKey === "Escape") {
      this.closePopup();
    }
  }

  /** allows the users to close the popup by clicking on the overlay, the shaded area around the popup */
  _handleFocusOutPopup(evt) {
    /** if the focus is outside the popup content */
    if (evt.target == this._popupElement) {
      this.closePopup();
    }
  };

  /** opens the popup window */
  openPopup() {
    this._popupElement.classList.add(popupSettings.openPopupClass);
    this._setTempEventListeners();
  };

  /** closes the popup window */
  closePopup() {
    this._popupElement.classList.remove(popupSettings.openPopupClass);
    this._removeTempEventListeners();
  };

  /** add temporary Listeners for events of popup closing */
  _setTempEventListeners() {
    this._closePopupButtonElement.addEventListener("click", this.closePopup);
    this._popupElement.addEventListener('mousedown', this._handleFocusOutPopup);
    document.addEventListener('keydown', this._handleEscClose);
  };

  /** remove the temporary Listeners */
  _removeTempEventListeners() {
    this._closePopupButtonElement.removeEventListener("click", this.closePopup);
    this._popupElement.removeEventListener('mousedown', this._handleFocusOutPopup);
    document.removeEventListener('keydown', this._handleEscClose);
  };

}

/***************************************************************************/
