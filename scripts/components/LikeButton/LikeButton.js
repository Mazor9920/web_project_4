/***************************************************************************/

/** LikeButton class
 *
 * @module LikeButton
 */

/***************************************************************************/

{/* <template id="card-template" class="template template_card">
<article class="card">
<button class="card__like-button" aria-label="like-button" type="button"></button> */}


export default class LikeButton {
    /**
     * Create a Like Button object
     */
    constructor(X) {
      this._X = X;
    }
  
   
  }
  
  /***************************************************************************/
  
  this.likesState = {
    /** likes contains an array of users who have liked the card */
    likes: [],
    likesCounter: likes.length,
    isUserLike: (userId) =>{
      if ( likes.includes(userId) ){
        return true;
      }
      return false;
    }
  };

//   this._toggleLikeState = toggleLikeState(this.likesState);
  // this._toggleLikeState();

  // _likeToggle(){
  //   this.likesState.islikeByUser = !(this.likesState.islikeByUser);
  //   this.likesState.likes
  // }

  // _countLikes(){
  //   this.likesState = {
  //     likesCounter: 0,
  //     likeUsers: {},
  //   };
