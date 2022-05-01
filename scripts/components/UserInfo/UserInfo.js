/***************************************************************************/

/** UserInfo class
 * Contain UserInfo class which responsible for rendering information about the user on the page.

 * It has a public method:
 * getUserInfo() - handy for cases when it's necessary to display the user data in the open form.
 *
 * @module UserInfo
 */

/***************************************************************************/

export default class UserInfo {
  /**
   * render user information
   * @param {Object.<string, string>} UserInfoSelectors - object with 2 properties (name and job),
   * which contain the element selectors of the uzer data:
   * @param UserInfoSelectors.name - selector of the element that contain the profile name.
   * @param UserInfoSelectors.job - selector of the element that contain the profile job.
   */
  constructor(UserInfoSelectors) {
    this._profileNameElement = document.querySelector(UserInfoSelectors.name);
    this._profileJobElement = document.querySelector(UserInfoSelectors.job);
  }

  /**
   * returns information about the uzer
   * @returns {Object.<string, string>} - an object which contain the uzer data: 2 properties (job and name)
   */
  getUserInfo() {
    const uzerInfo = {};
    uzerInfo.name = this._profileNameElement.textContent;
    uzerInfo.job = this._profileJobElement.textContent;
    return uzerInfo;
  }
}



/***************************************************************************/



// Section instead

// /**
//  * takes new user data and reset it on the page
//  * @param {Object.<string, string>} newUzerInfo - object with 2 properties (job and name) which contain the uzer data
//  * @param newUzerInfo.name - selector of the element that contain the profile name.
//  * @param newUzerInfo.job - selector of the element that contain the profile job.
//  */
// setUserInfo(newUzerInfo) {
//   this._profileNameElement.textContent = newUzerInfo.name;
//   this._profileJobElement.textContent = newUzerInfo.job;
// }
