/***************************************************************************/

/** CardsApi class - extension of Api class
 *
 * @module CardsApi
 *
 */

/***************************************************************************/

import Api from "./Api.js";

/***************************************************************************/

export default class CardsApi extends Api {
  constructor(options) {
    super(options);
  }



  getCardsApi() {
    return this.get({
      urlTargetExtension: `/cards`
    });
  }

  getCard(cardExtension) {
    return this.get({
      urlTargetExtension: `/cards/${cardExtension}`
    });
  }

  // NO Access
  setCardsApi(defaultCardsList){
    /** delete all exist data */
    this.delete({
      urlTargetExtension: `/cards`
    });
    /** add new default cards to the server */
    defaultCardsList.forEach((cardData) =>{
        this.post({ urlTargetExtension: `/cards`,
        bodyItems: cardData
      });
    });
  }



}

/***************************************************************************/
