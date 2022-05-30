/***************************************************************************/

/** Card class
 * Designed for personal use
 *
 * Contain Card class which creates a card with text and an image link
 * It has private methods for working with markup, adding event listeners,
 * and preparing the card for display.
 * It has one public method generateCard(),that returns
 * a fully functional card element populated with data. with attached event listeners.
 *
 * @module Card
 */

/***************************************************************************/

export default class Card {
  /**
   * Create a Card object
   * @callback handleCardClick - a function which set the functionality of card click event
   */
  constructor({
    data,
    cardTemplateSelector,
    cardSettings,
    handleCardClick,
    isOwnerCard
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSettings = cardSettings;
    this._handleCardClick = handleCardClick;
    this._isAllowedToDelete = isOwnerCard;
  }

  /** sets up card markup */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSettings.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  /**
   * sets up card content and functionality
   * @returns {HTMLElement} - returns a functional card element
   */
  generateCard() {
    this._element = this._getTemplate();

    this._addTemplateElements();
    this._setCardContent();
    this._setEventListeners();

    return this._element;
  }

  _addTemplateElements() {
    this._cardTitle = this._element.querySelector(this._cardSettings.cardTitleSelector);
    this._cardPicture = this._element.querySelector(this._cardSettings.cardPictureSelector);
    this._cardLikeButton = this._element.querySelector(this._cardSettings.cardLikeButtonSelector);
    this._cardDeleteButton = this._element.querySelector(this._cardSettings.cardDeleteButtonSelector);
    if (!this._isAllowedToDelete){
      this._removeDeleteCardOption();
    }
  }

  _setCardContent() {
    this._cardTitle.textContent = this._name;
    this._cardPicture.src = this._link;
    this._cardPicture.alt = `picture of ${this._name}`;
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener("click", (evt) => {
      this._handleCardLikeClick(evt);
    });

    if (this._isAllowedToDelete){
      this._cardDeleteButton.addEventListener("click", () => {
        this._handleCardDelete();
      });
    }

    this._cardPicture.addEventListener("click", () => {
      const cardData = {
        name: this._name,
        link: this._link
      };
      this._handleCardClick(cardData);
    });
  }

  _handleCardLikeClick() {
    this._toggleLikeAction();
  }

  _toggleLikeAction() {
    this._cardLikeButton.classList.toggle(this._cardSettings.cardLikeButtonActiveClass);
  }

  _removeDeleteCardOption() {
    if (this._cardDeleteButton) {
      this._cardDeleteButton.remove();
      this._cardDeleteButton = null;
    }
  }

  _handleCardDelete() {
    // if (this._isSafeToDelete ){
      this._deletePermanently();
    // }
  }

  _deletePermanently() {
    this._element.remove();
    this._element = null;
  }


}

/***************************************************************************/
