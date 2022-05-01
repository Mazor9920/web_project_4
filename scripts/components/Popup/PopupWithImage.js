/***************************************************************************/

/** PopupWithImage class - extension of Popup class
 * handle the functionality of modal window which contain an image along with it's caption
 *
 * Includes methods which opens/closes popup,
 * and considerates special conditions of image (as close-up look).
 *
 * @module PopupWithImage
 */

/***************************************************************************/

import {
  popupSettings,
  popupImageSettings
} from "../../utils/constants.js";

import Popup from "./Popup.js";

/***************************************************************************/

export default class PopupWithImage extends Popup {
  /**
   * Create a Popup with an image
   * @param {string} popupSelector - a CSS class selector of the popup element.
   * @param {Object.<string, string>} imageData - object with 2 properties (link, caption).
   * @param {string} imageData.link - the image src attribute value.
   * @param {string} imageData.caption - a caption for the image.
   */
  constructor({
    popupSelector,
    imageData
  }) {
    super(popupSelector);
    this._imageLinkElement = this._popupElement.querySelector(popupImageSettings.popupImageSelector);
    this._imageCaptionElement = this._popupElement.querySelector(popupImageSettings.popupImageCaprionSelector);
    this._imageLink = imageData.link;
    this._imageCaption = imageData.caption;
  }

  /** opens the popup-image window */
  openPopup() {
    this._setPopupContent();
    super.openPopup();
  };

  /** presents the content of the popup (image and its caption) */
  _setPopupContent() {
    this._imageLinkElement.src = this._imageLink;
    this._imageLinkElement.alt = `close up picture of ${this._imageCaption}`;
    this._imageCaptionElement.textContent = this._imageCaption;
  };

  resetImageData(newImageData) {
    this._imageLink = newImageData.link;
    this._imageCaption = newImageData.caption;
  };


}
