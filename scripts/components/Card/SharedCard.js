/***************************************************************************/

/** SharedCard class - extention of Card class
 *
 * Designed for use on a platform that allows access to multiple users.
 * This card represents a card as it is displayed to a specific user.
 *
 * Responsible for ensuring safe deletion only by the owner and documentation of users likes.
 * SharedCard.prototype has ensureDeleteIsSafe Aceess
 *
 * @module SharedCard
 */

/***************************************************************************/

import Card from './Card.js';

/***************************************************************************/


export default class SharedCard extends Card {
  /**
   * Create a SharedCard object
   */
  constructor({
    data,
    cardTemplateSelector,
    cardSettings,
    handleCardClick,
    likesCounter,
    isOwnerCard,
    ownerID,
    cardID
  }) {
    super({
      data,
      cardTemplateSelector,
      cardSettings,
      handleCardClick,
      isOwnerCard,
    });
    this._isSafeToDelete = false;
    this._likesCounter = likesCounter || 0;
    this._ownerID = ownerID;
    this._cardID = cardID;
  }

  /** delete methods */

  _handleCardDelete() {
    debugger;

    SharedCard.prototype.aboutToDelete = this;
    // this.aboutToDelete = this;
    if (!this._isSafeToDelete) {
      // using popup-function throught SharedCard.prototype
      this.ensureDeleteIsSafe(this);
    }
    super._handleCardDelete();
  }

  deleteForSure() {
    debugger;

    // this._isSafeToDelete = true;
    // this.aboutToDelete._handleCardDelete();
    this.aboutToDelete._deletePermanently();
  }


  /** like methods */


  _setCardContent() {
    super._setCardContent();
    this._cardLikeButton.textContent = (this._likesCounter == 0) ? `be #1` : `${this._likesCounter}`;
  }

  _resetLikeButtonContent() {
    this._cardLikeButton.textContent = `${this._likesCounter}`;
  }

  _handleCardLikeClick(evt) {
    debugger;
    // manageLikesTracking();
    this._toggleLikeAction();
    this._resetLikeButtonContent();
  }

  _toggleLikeAction() {
    const isLikedByUser = this._cardLikeButton.classList.toggle(this._cardSettings.cardLikeButtonActiveClass);
    isLikedByUser ? ++this._likesCounter : --this._likesCounter;
    // using popup-function throught SharedCard.prototype
    this.requestLikeAction({isLikedByUser, cardID});
  }



}

/***************************************************************************/
