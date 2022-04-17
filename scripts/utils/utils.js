  /***************************************************************************/

  /** Various utility functions that are used throughout the codebase.
   *  Contain function and event handlers that opens/closes modal windows.
   *
   * @module utils
   */

  /***************************************************************************/

  /****************   popup caseonfiguration settings object   ***************/

  const popupSettings = {
    openPopupClass: `popup_opened`,
    openPopupSelector: `.popup_opened`
  }

  /***************************************************************************/

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
