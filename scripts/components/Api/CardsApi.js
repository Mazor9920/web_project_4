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
    this._baseUrl = `${options.baseUrl}/${extensions.cards}`;
  }

  getCardsApi() {
    return this.get({});
  }

  getCard(cardExtension) {
    return this.get({
      urlTargetExtension: `/${cardExtension}`
    });
  }

  postNewCardOnServer(newCardData){
    debugger;
    return this.post({
      bodyItems: {
        name: `${newCardData.name}` ,
        link: `${newCardData.link}`
      }
    }) 
  }

  likeCard(cardID){
    return this.put({
      urlTargetExtension: `/likes/${cardID}`
    })
  }

  dislikeCard(cardID){
    return this.delete({
      urlTargetExtension: `/likes/${cardID}`
    }) 
  }





}

/***************************************************************************/


  // // NO Access
  // setCardsApi(defaultCardsList){
  //   /** delete all exist data */
  //   this.delete();
  //   /** add new default cards to the server */
  //   defaultCardsList.forEach((cardData) =>{
  //       this.post({ bodyItems: cardData
  //     });
  //   });
  // }