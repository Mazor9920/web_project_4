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
    this._closePopupButtonElement = popupSelector.querySelector(popupSettings.closeButtonSelector);
  }

  /** allows the users to close an open popup by pressing the Esc key */
  _handleEscClose(evt) {
    const pressedKey = evt.key;
    if (pressedKey === "Escape") {
      const openedPopupElement = document.querySelector(popupSettings.openPopupSelector);
      closePopup(openedPopupElement);
    }
  }

  /** allows the users to close the popup by clicking on the overlay, the shaded area around the popup */
  _handleFocusOutPopup(evt){
    // const openedPopupElement = evt.currentTarget;
    // const clickedElement = evt.target;
    // // if the focus is outside the popup content
    // if (clickedElement == openedPopupElement) {
    //   closePopup(openedPopupElement);
    // }

    /** if the focus is outside the popup content */
    if (evt.target == this._popupElement) {
      closePopup(this._popupElement);
    }
  };

  /** opens the popup window */
  openPopup() {
    this._popupElement.classList.add(popupSettings.openPopupClass);
    this.setEventListeners();
  };

  /** closes the popup window */
  closePopup() {
    this._popupElement.classList.remove(popupSettings.openPopupClass);
    this._removeTempCloseListeners();
  };

  /** add Listeners for events of popup opening/closing */
  setEventListeners() {
    this._closePopupButtonElement.addEventListener("click", () => closePopup(this._popupElement));
    _addTempCloseListeners();
  }

  /** add temporary Listeners */
  _addTempCloseListeners() {
    this._popupElement.addEventListener('mousedown', _handleFocusOutPopup);
    document.addEventListener('keydown', _handleEscClose);
  };

  /** remove temporary Listeners */
  _removeTempCloseListeners() {
    this._popupElement.removeEventListener('mousedown', _handleFocusOutPopup);
    document.removeEventListener('keydown', _handleEscClose);
  };

}
