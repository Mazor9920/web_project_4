/***************************************************************************/

/** UsersApi class - extension of Api class
 *
 * @module UsersApi
 *
 */

/***************************************************************************/

import Api from "./Api.js";

// import {
//   myAuthorizationData,
//   defaultUsersExtensions
// } from "../../utils/constants.js";


/***************************************************************************/

export default class UsersApi extends Api {
  constructor({options, extensions}) {
    super(options);
    this._usersApi = extensions.users;
    this._ownerApi = extensions.owner;
    this._avatarApi = extensions.avatar;

    }
  

  // getUsersApi() {
  //   return this.get({
  //     urlTargetExtension: `/users`
  //   });
  // }

  getUserProfile(userExtension){
    return this.get({
      urlTargetExtension: `/${this._usersApi}/${userExtension}`
    })
  };

  getOwnerProfile(){
    return this.getUserProfile(this._ownerApi);
  };


  getUserSrcPicture(userExtension) {
    return this.get({
      urlTargetExtension: `/${this._usersApi}/${userExtension}/${this._avatarApi}`
    })
  };

  /** modify the user data which already exists on the server */
  updateUserProfile({userExtension, newUserProfileData}) {
    return this.patch({
      urlTargetExtension: `/${this._usersApi}/${userExtension}`,
      bodyItems: newUserProfileData
    })
  }

  /** modify the user picture which already exists on the server */
  updateUserPicture({userExtension, newAvatar}) {
    return this.patch({
      urlTargetExtension: `/${this._usersApi}/${userExtension}/${this._avatarApi}`,
      bodyItems: newAvatar
    })
  }

}

/***************************************************************************/

// getCurrentApi
// immediately promise & resolved request - upon creation
function getCurrentOwnerProfile(){
  debugger;

  let promise1 = new Promise(resolve => resolve(usersApiData.getOwnerProfile()));
  let promise2 = new Promise(promise1 => resolve(ownerCard));

  return promise.then((ownerCard) => {
    return ownerCard;
  }) 
}

// getCurrentOwnerProfile( ){
//   Promise.reslve(this.getUserProfile(this.ownerExtension)).then(function(currentOwnerData) {
//     this.currentOwnerData = currentOwnerData;
//   });
//   return  this.currentOwnerData;
// } 

// loadUserProfile(userExtension, profileContainerSelector) {
//   this.loadApiData(`/users/${userExtension}`);
// }

// loadUserPicture(userExtension, profileContainerSelector) {
//   this.loadApiData(`/users/${userExtension}/avatar`);
// }

// loadInitialUser(userExtension, profileContainerSelector) {
//   Promise.all( loadUserProfile(userExtension, profileContainerSelector),
//                 loadUserPicture(userExtension, profileContainerSelector) )
//       .then((results) => {
//         /** initial user profile */
//         handleResult(results[0]);
//         /** initial user picture */
//         handleResult(results[1]);
// }

