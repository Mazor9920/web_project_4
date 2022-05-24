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
   * @callback processFormSubmit(handleFormSubmitData) - handler which get called by submit event fires to add extra functionality to the form submission(unrelated to inputs)
   * @callback handleFormSubmitData(Object) - special handler function for forms with input fields - get inputs as object of pairs [ `name` : `value`]
   */

  constructor({
    popupSelector,
    handleFormSubmitData,
    processFormSubmit
  }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(popupFormSettings.popupFormSelector);

    this._handleFormSubmitData = handleFormSubmitData;
    this._processFormSubmit = processFormSubmit;

    
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
    debugger;

    evt.preventDefault(); 
    this._handleFormSubmitData(this._getInputValues()) || undefined;
    this._processFormSubmit || undefined;
    this.closePopup();
  };

  // _processInputFormSubmit(){
  //   debugger;
  //   ;
  // }



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
