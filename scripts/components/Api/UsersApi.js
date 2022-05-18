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
  constructor(options) {
    super(options);
  }




  // getUsersApi() {
  //   return this.get({
  //     urlTargetExtension: `/users`
  //   });
  // }

  getUserProfile(userExtension) {
    return this.get({
      urlTargetExtension: `/users/${userExtension}`
    });
  }

  getUserSrcPicture(userExtension) {
    return this.get({
      urlTargetExtension: `/users/${userExtension}/avatar`
    });
  }

  /** modify the user data which already exists on the server */
  updateUserProfile({userExtension, newUserProfileData}) {
    return this.patch({
      urlTargetExtension: `/users/${userExtension}`,
      bodyItems: newUserProfileData
    })
  }

  /** modify the user picture which already exists on the server */
  updateUserPicture({userExtension, newAvatar}) {
    return this.patch({
      urlTargetExtension: `/users/${userExtension}/avatar`,
      bodyItems: newAvatar
    })
  }

}

/***************************************************************************/



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
