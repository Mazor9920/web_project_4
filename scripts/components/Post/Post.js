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
    constructor({postData, postID, createdAt, ownerData, likes}) 
    {
      this._postData = postData;
      this._postID = postID,
      this._createdAt = createdAt,

      // this._likes = [],
      this._likes = likes,
      this._likesCounter = this._likes.length,

      this.isLiked = false,

      this._owner = ownerData

    }


    

  }

  // this._owner = createOwner(ownerData),
  // this._ownerID= ownerData.id;
  // this._ownerCohort = ownerData.cohort;
  // owner: { 
  //           name: 'Name', 
  //           about: 'Description', 
  //           avatar: 'https://images.unsplash.com/photo-1620712943543-bc…8YWl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 
  //           _id: '6e8801c7c32e25b70e231f78', 
  //           cohort: 'group-12'
  //        }

Post.prototype.like = function () {
  this.isLiked = !this.isLiked;
};
  
function createPost({postData, postID, createdAt, ownerData}) {
    // Create an empty object with the prototype
    const newPost = Object.create(Post.prototype);
  
    // Add all the necessary properties to the object
    newPost._postData = postData;
    newPost._likes = [],
    newPost._likesCounter = this._likes.length,
    newPost._postID = postID,
    newPost._createdAt = createdAt,
    newPost._ownerID = ownerData.id;
    newPost._ownerCohort = ownerData.cohort;
    newPost.isLiked = false;
  
  
    // Return the post-card object
    return newPost;
  }
  
  
  /***************************************************************************/
  
 export{
    Post,
    createPost
 };