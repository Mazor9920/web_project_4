/***************************************************************************/

/** UserInfo class
 * Contain UserInfo class which responsible for rendering information about the user on the page.

 * It has 2 public methods:
 * getUserInfo() - handy for cases when it's necessary to display the user data in the open form.
 * setUserInfo() - adds new user on the page.

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
   * @returns {Object.<string, string>} - an object with 2 properties (job and name) which contain the uzer data
   */
  getUserInfo() {
    const uzerInfo = {};
    uzerInfo.name = this._profileNameElement.value;
    uzerInfo.job = this._profileJobElement.value;
    return uzerInfo;
  }

  /**
   * takes new user data and reset it on the page
   * @param {Object.<string, string>} - object with 2 properties (job and name) which contain the uzer data
   * @param uzerName - selector of the element that contain the profile name.
   * @param uzerJob - selector of the element that contain the profile job.
   */
  setUserInfo({
    uzerName,
    uzerJob
  }) {
    this._profileNameElement.textContent = uzerName;
    this._profileJobElement.textContent = uzerJob;
  }
}
