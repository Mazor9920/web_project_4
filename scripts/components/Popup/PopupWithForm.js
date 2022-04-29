/***************************************************************************/

/** PopupWithForm class - extension of Popup class
 * handle the functionality of modal window which contain a form
 *
 * Includes methods which opens/closes popup,
 * and considerates special conditions of form (as submit).
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
   * @callback handleSubmit - a function which calls when the form’s submit event fires.
   */
  //   @param {string} openButtonSelector - a CSS class selector of the popup element.

  constructor({popupSelector ,handleSubmitData}) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(popupFormSettings.popupFormSelector);
    this._handleSubmitData = handleSubmitData;
  }

  /** collects data from all the input fields and returns that data as an object */
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(popupFormSettings.popupFormInputSelector);
    this._formValues = {};

    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    // console.log(`_inputList: ` + this._inputList);
    // console.log(`_formValues: ` + this._formValues);
    
    return this._formValues;
  }

  
  /** modifies the parent method in order to add the `submit` event handler to the form */
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
    } );
  }

  /** modifies the parent method in order to reset the form once the popup is closed */
  closePopup() {
    super.closePopup();
    this._formElement.resetForm();
    this._formElement.removeEventListener("submit",  this._handleFormSubmit);
  };

  _handleFormSubmit(evt)
    {
      evt.preventDefault();
      this._handleSubmitData(this._getInputValues());
      this.closePopup();
    }
  


}
