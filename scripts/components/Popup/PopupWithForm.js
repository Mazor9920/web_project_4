/***************************************************************************/

/** PopupWithForm class - extension of Popup class
 * handle the functionality of modal window which contain a form
 *
 * Includes methods which opens/closes popup,
 * and considerates special conditions of form (as submit).
 *
 * It has a public method, setEventListeners() which activate the form.
 *
 * @module PopupWithForm
 */

/***************************************************************************/

import {
  popupSettings,
  popupFormSettings
} from "../../utils/constants.js";

import Popup from "./Popup.js";
import FormValidator from "../FormValidator/FormValidator";

/***************************************************************************/

export default class PopupWithForm extends Popup {
  /**
   * Create a Popup with a form
   * @param {string} popupSelector - a CSS class selector of the popup element.
   * @callback handleFormSubmitData - a function which calls when the form’s submit event fires.
   */
  //   @param {string} openButtonSelector - a CSS class selector of the popup element.

  constructor({
    popupSelector,
    handleFormSubmitData,
    processSubmit
  }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(popupFormSettings.popupFormSelector);
    this._handleFormSubmitData = handleFormSubmitData;
    this._processSubmit = processSubmit || this._processInputSubmit;
    /** bind() method used to prevent loosing 'this' when a function is used as a callback */
    this.closePopup = this.closePopup.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  /** collects data from all the input fields and returns that data as an object */
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(popupFormSettings.popupFormInputSelector);
    this._formValues = {};

    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  /** modifies the parent method in order to reset the form once the popup is closed */
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  };

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._processSubmit();
    this.closePopup();
  };

  _processInputSubmit(){
    this._handleFormSubmitData(this._getInputValues());
  }



  /** modifies the parent methods in order to add the `submit` event handler to the form: */

  _setTempEventListeners() {
    super._setTempEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  };

  _removeTempEventListeners() {
    super._removeTempEventListeners();
    this._formElement.removeEventListener('submit', this._handleFormSubmit);
  };

}

/***************************************************************************/


  // /** remove the temporary Listeners */
  // _removeTempEventListeners() {
  //   this._closePopupButtonElement.removeEventListener("click", this.closePopup);
  //   this._popupElement.removeEventListener('mousedown', this._handleFocusOutPopup);
  //   document.removeEventListener('keydown', this._handleEscClose);
  // };