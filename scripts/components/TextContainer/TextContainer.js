/***************************************************************************/

/** TextContainer class
 * Contain TextContainer class, which responsible for dealing with fields of text and their data,
 * through a callback functions.
 *
 * Handy for cases when the required functionality of text elements is repeated.
 * It has public methods for an easy access.
 *
 * @module TextContainer
 */

/***************************************************************************/

export default class TextContainer {
  /**
   * renders a list of elements on a page
   * @param {string} containerSelector - a CSS class selector of the container element which contains text fields elements.
   * @param {Object} initialSection - object with 2 properties (textItems and renderAllItems).
   * @param {Object} initialSection.textItems - serves as an object of elements-data, which loads on a page when initializing the class.
   * @callback initialSection.renderAllItems - a function which calls for each individual item when the page is loading.
   * @callback handleTextItems - a function which responsible for a certain activation for all of the text components, after the initial loading.
   */
  constructor({
    containerSelector,
    initialSection,
    handleTextItems
  }) {
    this._container = document.querySelector(containerSelector);
    this._textItems = initialSection.textItems;
    this._renderAllItems = initialSection.renderAllItems;
    this.handleTextItems = handleTextItems;
  };

  initializeContainerText() {
    this._renderAllItems(this._textItems);
  }

  resetItems(newItems) {
    this._textItems = newItems;
    this.initializeContainerText();
  };

  setItemTextContent({
    sourceElementSelector,
    newTextValue
  }) {
    const sourceElement = this._container.querySelector(sourceElementSelector);
    sourceElement.textContent = newTextValue;
  };

  setItemValue({
    sourceElementSelector,
    newValue
  }) {
    const sourceElement = this._container.querySelector(sourceElementSelector);
    sourceElement.value = newValue;
  };

}

/***************************************************************************/
