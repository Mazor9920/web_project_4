  /***************************************************************************/

  /** Various utility functions that are used throughout the codebase.
   *  Contain event handlers and function that opens/closes modal windows.
   * @module utils
   */

  /***************************************************************************/

  import {
    editProfilePopup,
    editProfileForm,
    profileEditButton,
    editProfileCloseButton
  } from "./index.js";

  import {
    addCardPopup,
    addCardForm,
    addCardButton,
    addCardCloseButton,
  } from "./index.js";

  import {
    validatableForms
  } from "./index.js";

  /***************************************************************************/

  /****************   popup caseonfiguration settings object   ***************/

  const popupSettings = {
    openPopupClass: `popup_opened`,
    openPopupSelector: `.popup_opened`
  }

  /************************      Event Listeners      ************************/

  /** edit-profile-form popup */

  profileEditButton.addEventListener("click", function(evt) {
    validatableForms.editProfile._loadExistData();
    openPopup(editProfilePopup);
  });

  editProfileCloseButton.addEventListener("click", function(evt) {
    closePopup(editProfilePopup);
  });

  /** add-card-form popup */

  addCardButton.addEventListener("click", function(evt) {
    validatableForms.addCard._resetForm();
    openPopup(addCardPopup);
  });

  addCardCloseButton.addEventListener("click", function(evt) {
    closePopup(addCardPopup);
  });

  /*************************************************************************/

  /************************   functions declarations   *********************/

  /***************************   general popups   **************************/

  /** opens the popup window */
  function openPopup(popupElement) {
    popupElement.classList.add(popupSettings.openPopupClass);
    // add a temporary Listeners:
    popupElement.addEventListener('mousedown', handleFocusOutPopup);
    document.addEventListener('keydown', handleEscPopup);
  }

  /** closes the popup window */
  function closePopup(popupElement) {
    popupElement.classList.remove(popupSettings.openPopupClass);
    // remove temporary Listeners:
    popupElement.removeEventListener('mousedown', handleFocusOutPopup);
    document.removeEventListener('keydown', handleEscPopup);
  }

  /** allows the users to close the popup by clicking on the overlay */
  function handleFocusOutPopup(evt) {
    const openedPopupElement = evt.currentTarget;
    const clickedElement = evt.target;
    // if the focus is outside the popup content
    if (clickedElement == openedPopupElement) {
      closePopup(openedPopupElement);
    }
  }

  /** allows the users to close an open popup by pressing the Esc key */
  function handleEscPopup(evt) {
    const pressedKey = evt.key;
    if (pressedKey === "Escape") {
      const openedPopupElement = document.querySelector(popupSettings.openPopupSelector);
      closePopup(openedPopupElement);
    }
  }

  /*************************************************************************/

  export {
    popupSettings,
    openPopup,
    closePopup,
    handleFocusOutPopup,
    handleEscPopup
  };
