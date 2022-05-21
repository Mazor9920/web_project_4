/***************************************************************************/

/** PopupWithImage class - extension of Popup class
 * handle the functionality of modal window which contain an image along with it's caption
 *
 * Includes methods which opens/closes popup,
 * and considerates special conditions of image (as close-up look).
 *
 * It has a public method, openPopup(imageData), which accepts as an argument the information of the image it contains.
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
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._imageLinkElement = this._popupElement.querySelector(popupImageSettings.popupImageSelector);
    this._imageCaptionElement = this._popupElement.querySelector(popupImageSettings.popupImageCaprionSelector);
  }

  /**
   * opens the popup window which presents image and its caption by the data it gets
   * @param {Object.<string, string>} imageData - an object with 2 properties (link, caption).
   */
  openPopup(imageData) {
    this._setImageData(imageData);
    this._setPopupContent();
    super.openPopup();
  };

  /**
   * set the image data - the image and its caption by the data it gets
   * @param {Object.<string, string>} imageData - object with 2 properties:
   * @param {string} imageData.link - the image src attribute value.
   * @param {string} imageData.caption - a caption for the image.
   */
  _setImageData(newImageData) {
    this._imageLink = newImageData.link;
    this._imageCaption = newImageData.caption;
  };

  /** sets the content of the popup (image and its caption) */
  _setPopupContent() {
    this._imageLinkElement.src = this._imageLink;
    this._imageLinkElement.alt = `close up picture of ${this._imageCaption}`;
    this._imageCaptionElement.textContent = this._imageCaption;
  };

  closePopup() {
    super.closePopup();
    delete this._imageLink;
    delete this._imageCaption;
  }

}

