/***************************************************************************/

/** Section class
 * Contain Section class which is responsible for rendering a list of elements (an array of items).
 * It receives the markup through the callback function,
 * and inserts it in the container.
 *
 * It has public methods:
 * renderItemsList() - which renders all data elements on the page.
 * addItemToBeginning() - which takes a DOM element and adds it to the container.
 *
 * @module Section
 */

/***************************************************************************/

export default class Section {
  /**
   * renders a list of elements on a page
   * @param {Object} initialSection - object with 2 properties (items and renderItem).
   * @param {Array.<Object>} initialSection.items - serves as an array of data, which loads on a page when initializing the class.
   * @callback initialSection.renderItem - a function which responsible for render each individual item as element on a page.
   * @param {string} containerSelector - a CSS class selector of the container element which the renderered-items add to.
   */
  constructor({
    initialSection,
    containerSelector
  }) {
    this._items = initialSection.items || [];
    this._renderItem = initialSection.renderItem;
    this._container = document.querySelector(containerSelector);
  };

  /** initializing the class */
  renderItemsList() {
    this._items.forEach(this._renderItem);
  };

  renderNewItem(item) {
    this._items.push(item);
    this._renderItem(item);
  };

  addItemToBeginning(element) {
    this._container.prepend(element);
  };

  resetItemsList(items) {
    this._items = items;
    this.renderItemsList();
  };

}

/***************************************************************************/
