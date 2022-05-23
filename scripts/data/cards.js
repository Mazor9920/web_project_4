/***************************************************************************/

/** Contain Data of initial cards values for first loading as defult
 *
 * @module cards
 */

/***************************************************************************/

const myCardsListCountless = [
  {
    name: `NO WORRIES`,
    link: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNQRm6wLyZ68dvrUMtAEEREK8VHfFi2tJow&usqp=CAU`
  },
  {
    name: `WORK HARD PLAY HARD`,
    link: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRJEw9Knkm-tEUVQrVE85opj0wE7rdQIl24rFXG0wcI4uGXq1YX8NFr5__2xxXZq6etM&usqp=CAU`
  },
  {
    name: `R U SURE?`,
    link: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdj_eIbIjWsnfxgMRc9PDyb3rkGrZ10XhooSySBn546yO1kXhvXM6DXfVV6Uwjz9arTM&usqp=CAU`
  }
];

const initialCardsCountless = [
  {
    name: `Yosemite Valley`,
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: `Lake Louise`,
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: `Bald Mountains`,
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: `Latemar`,
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: `Vanoise National Park`,
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: `Lago di Braies`,
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


function addCounterToCardsList(cardsList){
  var cardCounter = 0;
    return cardsList.map( (cardDataObject) => {
      ++cardCounter;
       cardDataObject.name = `${cardCounter} ` +  cardDataObject.name;
      return  cardDataObject;
    });
};

const myCardsList = addCounterToCardsList(myCardsListCountless);
const defaultCardsList = addCounterToCardsList([...initialCardsCountless, ...initialCardsCountless, ...initialCardsCountless]);

/***************************************************************************/

export {
  defaultCardsList,
  myCardsList
};

/***************************************************************************/

/**   I may have mistakenly sabotaged the original API data.
      My try to fix it didn't work out */

// NO Access

// setInitialApiData(defaultCardsList);

/** delete exist data and post its default values */
// function setInitialApiData(defaultCardsList, defaultUserProfile){
//   cardsApiData.setCardsApi(defaultCardsList);
// }