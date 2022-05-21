/***************************************************************************/

/** SharedCard class - extention of Card class
 * 
 * Card class contain Card class which creates a card with text and an image link
 * It has private methods for working with markup, adding event listeners,
 * and preparing the card for display.
 * It has one public method generateCard(),that returns
 * a fully functional card element populated with data. with attached event listeners.
 *
 * @module SharedCard
 */

/***************************************************************************/

import Card from './Card.js';

/***************************************************************************/

export default class SharedCard extends Card{
  /**
   * Create a SharedCard object
   * @callback handleCardClick - a function which set the functionality of card click event
   */
  constructor({
    data,
    cardTemplateSelector,
    cardSettings,
    handleCardClick
  }) {
    super({data, cardTemplateSelector, cardSettings, handleCardClick});
    this.isSafeToDelete = false;
    this.isLiked = false;
    this.likesCounter = 0;
  }

  _handleCardDelete(){
    SharedCard.prototype.aboutToDelete = this;
    if(this.isSafeToDelete){
      this._deletePermanently();
    }else{
      // using throught SharedCard.prototype
      this.ensureDeleteIsSafe(this);
    }
  }

  deleteForSure(){
    this.isSafeToDelete = true;
    this.aboutToDelete._handleCardDelete();
  }


    // showLikesCounter()



  _handleCardLikeClick() {
    this._cardLikeButton.classList.toggle(this._cardSettings.cardLikeButtonActiveClass);
    this._toggleUserLikeAction();
    this._cardLikeButton.textContent = this.likesCounter;
  }

  _toggleUserLikeAction(){
    this.isLiked = !isLiked;
    // if user in likers?
    // const likeAction = isLiked ? like : dislike;
    const likeAction = (isLiked) ? +1 : (-1);
    this.likesCounter += likeAction;
  }





}

/***************************************************************************/
