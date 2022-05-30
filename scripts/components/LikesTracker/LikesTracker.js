/***************************************************************************/

/** LikesTracker class
 *
 * @module LikesTracker
 */

/***************************************************************************/



class LikesTracker {
  /**
   * Create a Like Tracker object
   * @param {array} likes contains an array of users (by Id's) who have liked an object with this button
   */
  constructor(likes) {
    this.likes = likes || [];
  }


  manageLikesTracking(likeTrackerElement) {

  }

  /**
   * @param {*} userId
   * @returns {boolean} returns true if user already liked this object
   */
  isLikedByUser(userId) {
    return (likes.includes(userId)) ? true : false;
  }

  getLikeCount() {
    return this.likes.length;
  }

  toggleUserLikeState(userId) {
    this.isLikedByUser(userId) ? dislikeByUser(userId) : likeByUser(userId);
  }

  likeByUser(userID) {
    this._likes.push(userID);
  }

  dislikeByUser(userID) {
    // if length isn't auto update
    // this._likesCounter = new array of this._likes

    // here - need to use reduce to remove userID from this._likes
    // this._likes.filter(function(item) { return item !== userID });

    console.log(this._likes);

    this._cardLikesTracker.classList.remove(this._cardSettings.cardLikesTrackerActiveClass);
  }



  /** The variable isLikedByUser has a boolean value that represents whether or not the user currently likes the card */
  toggleLikeActionByUser(userID) {
    debugger;
    console.log(this._likesCounter);

    // gets true if user like it, false if user dislike it
    const isLikedByUser = !this._likes.includes(userID);

    // render the Like Action of the curent user
    isLikedByUser ? this._likeByUser(userID) : this._dislikeByUser(userID);

    debugger;
    console.log(this._likesCounter);
  }

}






/***************************************************************************/



function createLikesTracker(likes) {
  const newLikesTracker = Object.create(LikesTracker.prototype);
  newLikesTracker.likes = likes || [];

  return newLikesTracker;
}


/***************************************************************************/

export {
  LikesTracker,
  createLikesTracker
};



// manageLikesTracking(this.likes);




// _handleCardLikeClick(evt) {
//   debugger;

//   // this._toggleLikeAction();
//   // LikesTracker.prototype._toggleLikeAction();

//   this._resetLikeButtonContent();

//   }

// _toggleLikeAction(){
//   debugger;

//   // super._toggleLikeAction();
//   this._isLikedByUser = !isLikedByUser;
//   (this._isLikedByUser) ? (++this.likesCounter) : (--this.likesCounter);
// }
