/***************************************************************************/

/** Section class
 * Contain Section class which rendering a list of elements on a page.
 * It receives the markup through the callback function,
 * and inserts it in the container.
 *
 * It has 2 public methods:
 * renderItems() - which renders all data elements on the page.
 * addItem() - which takes a DOM element and adds it to the container.
 *
 * @module Section
 */

/***************************************************************************/

export default class Section {
  /**
    * renders a list of elements on a page
    * @param {string} containerSelector - a CSS class selector of the container element which the renderered-items add to.
    * @param {Object} - object with 2 properties (items and renderer).
    * @type {Array.<Object>} Object.items - serves as an array of data, which loads on a page when initializing the class.
    * @callback Object.renderer - a function which responsible for render each individual item as element on a page.
    */
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  // clear() {
  //   this._container.innerHTML = "";
  // }

  renderItems() {
    // this.clear();
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

}

/***************************************************************************/
