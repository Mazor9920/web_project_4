/***************************************************************************/

/** Post class
 *
 * @module Post
 */

/***************************************************************************/


class Post {
  /**
   * Create a Post object
   */
  constructor({
    likes,
    _id,
    createdAt,
    ownerData,
    postData
  }) {
    this.likes = Object.assign({}, (likes || []));
   
    this._id = _id;
    this.createdAt = createdAt;

    this.owner = Object.assign({}, ownerData);

    for (const dataItem in postData) {
      debugger;
      this[dataItem] = `${postData[dataItem]}`;
    }
  }

  // this._likesCounter = this.likes.length;
    // this._isLiked = (this._likesCounter > 0);

  _toggleUserAction(evt) {
    // const userID =
    // const action = delete trigger, like/dislike
    // switch (action)
    // allows delete if this._postID ===
  }


  _isPostLikedByUser(userID) {
    return this._likes.includes(userID);
  }


}


// add Post-prototype Access to diffrent object
// I used it to add Post-prototype Access to each New Shared Card
// ownerData = {about,avatar,cohort,name,_id}

function createPost({
  likes,
  _id,
  createdAt,
  ownerData,
  postData,
}) {

  // Create an empty object with the prototype
  const newPost = Object.create(Post.prototype);

  // Add all the necessary properties to the object
  newPost.likes = Object.assign({}, likes);

  newPost._id = _id;
  newPost.createdAt = createdAt;

  newPost.owner = Object.assign({}, ownerData);

  for (const dataItem in postData) {
    newPost[dataItem] = `${postData[dataItem]}`;
  }


  // Return the post-card object
  return newPost;
}




/***************************************************************************/

export {
  Post,
  createPost
};
