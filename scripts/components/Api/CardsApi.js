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
  constructor({options, extensions}) {
    super(options);
    this._cardsApi = extensions.cards;

  }

  getCardsApi() {
    return this.get({
      urlTargetExtension: `/${this._cardsApi}`
    });
  }

  getCard(cardExtension) {
    return this.get({
      urlTargetExtension: `/${this._cardsApi}/${cardExtension}`
    });
  }

  // NO Access
  setCardsApi(defaultCardsList){
    /** delete all exist data */
    this.delete({
      urlTargetExtension: `/${this._cardsApi}`
    });
    /** add new default cards to the server */
    defaultCardsList.forEach((cardData) =>{
        this.post({ urlTargetExtension: `/${this._cardsApi}`,
        bodyItems: cardData
      });
    });
  }

  


  



}

/***************************************************************************/
