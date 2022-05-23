/***************************************************************************/

/** SharedCard class - extention of Card class
 * Designed for use on a platform that allows access to multiple users.
 * Responsible for ensuring safe deletion and documentation of likes.
 * SharedCard.prototype has ensureDeleteIsSafe Aceess
 * 
 * @module SharedCard
 */

/***************************************************************************/

import Card from './Card.js';

/***************************************************************************/

export default class SharedCard extends Card{
  /**
   * Create a SharedCard object
   */
  constructor({
    data,
    cardTemplateSelector,
    cardSettings,
    handleCardClick,
    // getCurrentUserID
  }) {
    super({data, cardTemplateSelector, cardSettings, handleCardClick});
    this._isSafeToDelete = false;
    this._likes = [];
    this._likesCounter = this._likes.length
    this._isLiked = this._likesCounter > 0 ;
    // this._getCurrentUserID = getCurrentUserID;
    // this._currentUserID = getCurrentUserID;
  }

/** delete methods */

  _handleCardDelete(){
    SharedCard.prototype.aboutToDelete = this;
    // this.aboutToDelete = this;
    if(this._isSafeToDelete){
      this._deletePermanently();
    }else{
      // using function throught SharedCard.prototype
      this.ensureDeleteIsSafe(this);
    }
  }

  deleteForSure(){
    this._isSafeToDelete = true;
    this.aboutToDelete._handleCardDelete();
  }

  resetLikeCounter(){
    this._cardLikeButton.textContent = this._likesCounter;
  }


/** like methods */


  _showLikesCounterElement(){
    if (this._isLiked){
      this._cardLikeButton.textContent = this._likesCounter;
    }
  }

  _handleCardLikeClick(evt) {

    debugger;

    console.log(evt);
    //try to get user id - to write getCurrentUserID outside 
    // this._currentUserID = getCurrentUserID;
    const userID = this._getCurrentUserID(evt);


    debugger;

    
    this._toggleUserLikeAction(userID);

    if (this._likesCounter > 0)
    {
      this._showLikesCounterElement();
    }
  }
  

    /** The variable isLikedByUser has a boolean value that represents whether or not the user currently likes the card */
    _toggleLikeActionByUser(userID){
      debugger;
      console.log(this._likesCounter);

      // gets true if user like it, false if user dislike it
      const isLikedByUser = !this._likes.includes(userID);

      // render the Like Action of the curent user
      isLikedByUser ? this._likeByUser(userID) : this._disLikeByUser(userID);

      debugger;
      console.log(this._likesCounter);
    }


  _likeByUser(userID){
    this._likes.push(userID);
    // if length isn't auto update
    // this._likesCounter = this._likes.push(userID);
    this._cardLikeButton.classList.add(this._cardSettings.cardLikeButtonActiveClass);
  }

  _disLikeByUser(userID){
    // if length isn't auto update
    // this._likesCounter = new array of this._likes 

    // here - need to use reduce to remove userID from this._likes
    // this._likes.filter(function(item) { return item !== userID });

    console.log(`this._likesafter I liked card looks like:`);
    console.log(this._likes);
    
    this._cardLikeButton.classList.remove(this._cardSettings.cardLikeButtonActiveClass);
  }



}

/***************************************************************************/

