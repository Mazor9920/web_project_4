/***************************************************************************/

/** Section class
 * Contain Section class which rendering a list of elements on a page.
 * It receives the markup through the callback function,
 * and inserts it in the container.
 *
 * It has public methods:
 * renderItems() - which renders all data elements on the page.
 * addItemToBeginning() - which takes a DOM element and adds it to the container.
 *
 * @module Section
 */

/***************************************************************************/

export default class Section {
  /**
   * renders a list of elements on a page
   * @param {Object} initialSection - object with 2 properties (items and renderer).
   * @param {Array.<Object>} items - serves as an array of data, which loads on a page when initializing the class.
   * @callback initialSection.renderer - a function which responsible for render each individual item as element on a page.
   * @param {string} containerSelector - a CSS class selector of the container element which the renderered-items add to.
   */
  constructor({
    initialSection,
    containerSelector
  }) {
    this._renderedItems = initialSection.items;
    this._renderer = initialSection.renderer;
    this._container = document.querySelector(containerSelector);
  };

  /** initializing the class */
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  };

  rerenderItems(renderedItems) {
    this._renderedItems = renderedItems;
    this.renderItems();
  };

  setContainerTextContent({
    sourceElementSelector,
    newTextValue
  }) {
    const sourceElement = this._container.querySelector(sourceElementSelector);
    sourceElement.textContent = newTextValue;
  };

  setContainerValues({
    sourceElementSelector,
    newValue
  }) {
    const sourceElement = this._container.querySelector(sourceElementSelector);
    sourceElement.value = newValue;
  };

  renderNewItem(item) {
    this._renderer(item);
  };

  // addItemToBeginning(element) {
  //   this._container.prepend(element);
  // };

}

/***************************************************************************/
