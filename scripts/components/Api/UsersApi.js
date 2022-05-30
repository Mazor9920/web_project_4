/***************************************************************************/

/** UsersApi class - extension of Api class
 *
 * @module UsersApi
 *
 */

/***************************************************************************/

import Api from "./Api.js";

/***************************************************************************/

export default class UsersApi extends Api {
  constructor({options, extensions}) {
    super(options);
    this._ownerApi = extensions.owner;
    this._avatarApi = extensions.avatar;
    this._baseUrl = `${options.baseUrl}/${extensions.users}`;
    }
  
  /** For different pages   */ 
  getUsersApi() {
    return this.get();
  }
  
  getUserProfile(userExtension){
    return this.get({
      urlTargetExtension: `/${userExtension}`
    })
  };

  getOwnerProfile(){
    return this.getUserProfile(this._ownerApi);
  };


  getUserSrcPicture(userExtension) {
    return this.get({
      urlTargetExtension: `/${userExtension}/${this._avatarApi}`
    })
  };

  /** modify the user data which already exists on the server */
  updateUserProfile({userExtension, newUserProfileData}) {
    debugger;
    return this.patch({
      urlTargetExtension: `/${userExtension}`,
      // bodyItems: newUserProfileData
      bodyItems: {
        name: `${newUserProfileData.name}` ,
        about: `${newUserProfileData.about}`
      }
    })
  }

  /** modify the user picture which already exists on the server */
  updateUserPicture({userExtension, newAvatar}) {
    return this.patch({
      urlTargetExtension: `/${userExtension}/${this._avatarApi}`,
      bodyItems: newAvatar
    })
  }

}

/***************************************************************************/

