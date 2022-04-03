/***************************************************************************/

/************************       DOM selecting       ************************/

const content = document.querySelector("#content");

/** profile Elements */
const profile = content.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDetails = profileInfo.querySelector(".profile__details");

/** edit-profile popup Elements */
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
const editProfileCloseButton = editProfilePopupContainer.querySelector(".popup__close-button");
const editProfileForm = editProfilePopupContainer.querySelector(".popup__form");

const editProfileFormTitle = editProfileForm.querySelector(".form__title");
const editProfileSaveButton = editProfileForm.querySelector(".form__submit-button");
/** user input fields */
const profileNameInput = editProfileForm.querySelector(".form__input_value_profile-name");
const profileJobInput = editProfileForm.querySelector(".form__input_value_profile-job");

/** gallery Elements */
const gallery = content.querySelector(".gallery");
/** card-template Elements */
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector('.card');

/** add-card popup Elements */
const addCardPopup = document.querySelector("#add-card-popup");
const addCardPopupContainer = addCardPopup.querySelector(".popup__container");
const addCardCloseButton = addCardPopupContainer.querySelector(".popup__close-button");
const addCardForm = addCardPopupContainer.querySelector(".popup__form");

const addCardFormTitle = addCardForm.querySelector(".form__title");
const addCardCreateButton = addCardForm.querySelector(".form__submit-button");
/** user input fields */
const cardNameInput = addCardForm.querySelector(".form__input_value_card-name");
const cardLinkInput = addCardForm.querySelector(".form__input_value_card-link");

/** card popup Elements */
const cardPopup = document.querySelector("#card-popup");
const cardPopupContainer = cardPopup.querySelector(".popup__container_value_card-popup");
const cardPopupCloseButton = cardPopupContainer.querySelector(".popup__close-button_placed_card-popup");
const cardCloseUpPicture = cardPopupContainer.querySelector(".popup__close-up-picture");
const cardPictureDetails = cardPopupContainer.querySelector(".popup__picture-details");

/***************************************************************************/

/************************      functions calls      ************************/

loadInitialCards(initialCards);

/***************************************************************************/

/************************      Event Listeners      ************************/

/** edit-profile-form popup */

profileEditButton.addEventListener("click", function(evt) {
  loadProfile();
  openPopup(editProfilePopup);
});

editProfileCloseButton.addEventListener("click", function(evt) {
  closePopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

/** add-card-form popup */

addCardButton.addEventListener("click", function(evt) {
  initialInputValues();
  openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", function(evt) {
  closePopup(addCardPopup);
});

addCardForm.addEventListener('submit', handleAddCardSubmit);

/** card Popup */

cardPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(cardPopup);
});

/***************************************************************************/

/************************   functions declarations   ***********************/


/*********************************   profile   *****************************/

/** shows the existing profile values on the input fileds */
function loadProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDetails.textContent;
  freezePlaceholder(editProfileForm, profileNameInput);
  freezePlaceholder(editProfileForm, profileJobInput);
}

/** edits the profile details by the user input */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDetails.textContent = profileJobInput.value;
  closePopup(editProfilePopup);
}

/*********************************   cards   ****************************/

/**
 * Represents a Card Object.
 * @constructor
 * @param {string} name - the title of the card.
 * @param {string} link - the link of the card picture.
 */
function Card(name, link) {
  this.name = name;
  this.link = link;
}

/** creates a new card object
 * @param {string, string} cardData - input values array: title of the card ,link of the card picture.
 * @returns {Card} newCardObject
 * {string} Card.name - the title of the card.
 * {string} Card.link - the link of the card picture.
 */
function createCard(cardData) {
  const cardName = cardData[0].value;
  const cardLink = cardData[1].value;
  const newCardObject = new Card(cardName, cardLink);
  return newCardObject;
}

/** sets up card markup and functionality out of the card-template
 * @param {Card} cardToRender - a card object
 * {string} Card.name
 * {string} Card.link
 */
function renderCard(cardToRender) {
  const renderedCard = cardElement.cloneNode(true);
  const cardDeleteButton = renderedCard.querySelector(".card__delete-button");
  const cardPicture = renderedCard.querySelector(".card__picture");
  const cardInfo = renderedCard.querySelector(".card__info");
  const cardTitle = cardInfo.querySelector(".card__title");
  const cardLikeButton = cardInfo.querySelector(".card__like-button");

  const cardLink = cardToRender.link;
  const cardName = cardToRender.name;

  cardTitle.textContent = cardName;
  cardPicture.src = cardLink;
  cardPicture.alt = "picture of " + cardName;

  cardLikeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", function(evt) {
    evt.target.closest(".card").remove();
  });
  cardPicture.addEventListener("click", handlePictureClick);

  return renderedCard;
}

/** makes card content appear on the gallery
 * @param {Card} card - a card object
 * {string} Card.name
 * {string} Card.link
 */
function addCard(card) {
  gallery.prepend(renderCard(card));
}

/** shows the placeholders values of the input fileds if those changed */
function initialInputValues() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

/********************************   card popup   ***************************/

/** opens a popup-card which contain close-up and description of a specific clicked-image */
function handlePictureClick(evt) {
  const cardPicture = evt.target;
  const cardToPopup = evt.target.closest(".card");
  const cardInfo = cardToPopup.querySelector(".card__info");
  const cardTitle = cardInfo.querySelector(".card__title");

  const cardPopupLink = cardPicture.src;
  const cardPopupName = cardTitle.textContent;

  cardPictureDetails.textContent = cardPopupName;
  cardCloseUpPicture.src = cardPopupLink;
  cardCloseUpPicture.alt = "close up picture of " + cardPopupName;

  openPopup(cardPopup);
}

/** edits the card values by the user input */
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputCardData = evt.target.closest(".form").querySelectorAll(".form__input");
  const inputCard = createCard(inputCardData);
  addCard(inputCard);
  closePopup(addCardPopup);
}

/********************************   load data   ****************************/

/** loads the initial Cards values using the addCard-function for each one of the cards
 * @param {Array.<Card>} initialCards - an array of cards object
 */
function loadInitialCards(initialCards) {
  initialCards.forEach((card) => {
    addCard(card);
  });
}

/***************************************************************************/
