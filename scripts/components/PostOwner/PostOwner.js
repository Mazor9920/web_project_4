/***************************************************************************/

/** PostOwner class
 *
 * @module PostOwner
 */

/***************************************************************************/

class PostOwner {
    /**
     * Create a PostOwner object
     */
    constructor({about,avatar,cohort,name,_id}) 
    {
        this.owner.name =   name;
        this.owner.about =   about;
        this.owner.avatar =   avatar;
        this.owner._id =   _id;
        this.owner.cohort =   cohort;
    }
  }


function createPostOwner({about,avatar,cohort,name,_id}) {
    // Create an empty object with the prototype
    const newPostOwner = Object.create(PostOwner.prototype);
  
    // Add all the necessary properties to the object
    newPostOwner.name =   name;
    newPostOwner.about =   about;
    newPostOwner.avatar =   avatar;
    newPostOwner._id =   _id;
    newPostOwner.cohort =  cohort ;

    // Return the Post-Owner object
    return newPostOwner;
  }
  
  
  /***************************************************************************/
  
 export{
    PostOwner,
    createPostOwner
 };
