/***************************************************************************/

/** Api class
 * Contain an Api class for working with the API data
 *
 * It has private methods which handeling the server requests:
 * checking the server response
 * getting the data
 * catching errors and processing them
 *
 * It has a public method
 *
 * @module Api
 */

/***************************************************************************/


export default class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * search for Api data to implement specific request
   * @param {Object.<string, string>} options - An object with a variable number of propertie:value pairs, it's default value is empty (destructuring assignment syntax)
   */
  _enableApiDataAccess(urlTargetExtension, options) {
   debugger;

    return fetch(this._baseUrl + urlTargetExtension, {
        ...options,
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
          
        }
        /* if the server returns an error,
        reject the promise with the response's status code as reason,
        and move to the catch block */
        return Promise.reject(res.status);
      })

      .catch((err) => {
        console.log(`ERROR! API Access Error: ${err}`);
      }) 
  }

  get({
    urlTargetExtension =``,
    exstraOptions = {}
  }) {
    return this._enableApiDataAccess(urlTargetExtension , {
      ...exstraOptions,
      method: "GET"
    });
  }

  post({
    urlTargetExtension = ``,
    exstraOptions = {},
    bodyItems
  }) {
    return this._enableApiDataAccess(urlTargetExtension, {
      ...exstraOptions,
      body: bodyItems ? JSON.stringify(bodyItems) : undefined,
      method: "POST"
    })
  }

  patch({
    urlTargetExtension = ``,
    exstraOptions = {},
    bodyItems
  }) {
    return this._enableApiDataAccess(urlTargetExtension, {
      ...exstraOptions,
      body: bodyItems ? JSON.stringify(bodyItems) : undefined,
      method: "PATCH"
    });
  }

  delete({
    urlTargetExtension,
    exstraOptions = {}
  }) {
    return this._enableApiDataAccess(urlTargetExtension, {
      ...exstraOptions,
      method: "DELETE"
    });
  }

   put({
      urlTargetExtension = ``,
      exstraOptions = {},
      bodyItems
    }) {
    return this._enableApiDataAccess(urlTargetExtension, {
      ...exstraOptions,
      body: JSON.stringify(bodyItems),
      method: "PUT"
    });
  }


  /**
   * @callback handleProcess - handler function which responsible for API functionality that may take some time (as API data is updating/loading) 
   * @callback handleWhileProcess - handler function which responsible for handle extra process (the page functionality) while handleProcess is running
   * @callback handleResult - a function which receive the response object as an input and handle its data
   * @callback handleError - a function which receive the response error as an input and handle this information
   */
  loadWhileApiProcess({
    // requestedProcessData,
    handleWhileProcess, 
    handleProcess,
    handleResult,
    handleError
  }) {
    // when process starts
    handleWhileProcess(true);
    // handleProcess(requestedProcessData)
    handleProcess
    .then((res) => {
        handleResult(res);
      })
      .catch((err) => {
        console.log(`ERROR! occurred while loading API data, loading Error: ${err}`);
        handleError(err);
      })
    // when process ends
      .finally(handleWhileProcess(false));
  }
   

}

/***************************************************************************/
