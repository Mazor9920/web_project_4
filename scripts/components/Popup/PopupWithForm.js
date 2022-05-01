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
   * @callback handleFormSubmit - a function which calls when the form’s submit event fires.
   */
  //   @param {string} openButtonSelector - a CSS class selector of the popup element.

  constructor({
    popupSelector,
    handleFormSubmit
  }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(popupFormSettings.popupFormSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  /** collects data from all the input fields and returns that data as an object */
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(popupFormSettings.popupFormInputSelector);
    this._formValues = {};

    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }


  /** modifies the parent method in order to add the `submit` event handler to the form */
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  /** modifies the parent method in order to reset the form once the popup is closed */
  closePopup() {
    this._formElement.reset();
    super.closePopup();
  };


}
