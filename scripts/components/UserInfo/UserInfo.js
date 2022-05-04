/***************************************************************************/

/** UserInfo class
 * Contain UserInfo class which responsible for rendering information about the user on the page.

 * It has 2 public methods:
 * getUserInfo() - handy for cases when it's necessary to display the user data in the open form.
 * setUserInfo() - which takes new user data and adds it on the page.
 *
 * @module UserInfo
 */

/***************************************************************************/

export default class UserInfo {
  /**
   * render user information
   * @param {Object.<string, string>} UserInfoSelectors - object with 2 properties (name and job),
   * which contain the element selectors of the user data:
   * @param userInfoSelectors.name - selector of the element that contain the profile name.
   * @param userInfoSelectors.job - selector of the element that contain the profile job.
   */
  constructor(userInfoSelectors) {
    this._profileNameElement = document.querySelector(userInfoSelectors.name);
    this._profileJobElement = document.querySelector(userInfoSelectors.job);
  }

  /**
   * returns information about the user
   * @returns {Object.<string, string>} - an object which contain the user data: 2 properties (job and name)
   */
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._profileNameElement.textContent;
    userInfo.job = this._profileJobElement.textContent;
    return userInfo;
  }

  /**
   * takes new user data and reset it on the page
   * @param {Object.<string, string>} newUserInfo - object with 2 properties (job and name) which contain the user data
   * @param newUserInfo.name - selector of the element that contain the profile name.
   * @param newUserInfo.job - selector of the element that contain the profile job.
   */
  setUserInfo(newUserInfo) {
    this._profileNameElement.textContent = newUserInfo.name;
    this._profileJobElement.textContent = newUserInfo.job;
  }

}

/***************************************************************************/
