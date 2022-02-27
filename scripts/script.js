/////////////////////////////////////////////////////////////////////////////

/////////////////////////       DOM selecting       /////////////////////////

const content = document.querySelector("#content");

// profile Elements
const profile = content.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDetails = profileInfo.querySelector(".profile__details");

// edit-profile popup Elements
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
const editProfileCloseButton = editProfilePopupContainer.querySelector(".popup__close-button");
const editProfileForm = editProfilePopupContainer.querySelector(".popup__form");
const editProfileFormTitle = editProfileForm.querySelector(".popup__title");
const editProfileSaveButton = editProfileForm.querySelector(".popup__submit-button");
// user input fields
const profileNameInput = editProfileForm.querySelector(".popup__input-field_value_profile-name");
const profileJobInput = editProfileForm.querySelector(".popup__input-field_value_profile-job");

// gallery Elements
const gallery = content.querySelector(".gallery");
// card template Elements
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector('.card');

// add-card popup Elements
const addCardPopup = document.querySelector("#add-card-popup");
const addCardPopupContainer = addCardPopup.querySelector(".popup__container");
const addCardCloseButton = addCardPopupContainer.querySelector(".popup__close-button");
const addCardForm = addCardPopupContainer.querySelector(".popup__form");
const addCardFormTitle = addCardForm.querySelector(".popup__title");
const addCardCreateButton = addCardForm.querySelector(".popup__submit-button");
// user input fields
const cardNameInput = addCardForm.querySelector(".popup__input-field_value_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input-field_value_card-link");

// card popup Elements
const cardPopup = document.querySelector("#card-popup");
const cardPopupContainer = cardPopup.querySelector(".popup__container_value_card-popup");
const cardPopupCloseButton = cardPopupContainer.querySelector(".popup__close-button_placed_card-popup");
const cardCloseUpPicture = cardPopupContainer.querySelector(".popup__close-up-picture");
const cardPictureDetails = cardPopupContainer.querySelector(".popup__picture-details");

/////////////////////////////////////////////////////////////////////////////

/////////////////////////      functions calls      /////////////////////////

loadInitialCards(initialCards);

/////////////////////////////////////////////////////////////////////////////

/////////////////////////      Event Listeners      /////////////////////////

 // edit-profile popup 

profileEditButton.addEventListener("click", function(evt) {
  loadProfile();
  openPopup(editProfilePopup);
});

editProfileCloseButton.addEventListener("click", function(evt) {
  closePopup(editProfilePopup);
});

// watch the submit-form event, it won't submit anywhere just yet
editProfileForm.addEventListener('submit', handleProfileFormSubmit);


 // add-card popup

addCardButton.addEventListener("click", function(evt) {
  openPopup(addCardPopup);
  // setInputValues();
});

addCardCloseButton.addEventListener("click", function(evt) {
  closePopup(addCardPopup);
});

// watch the submit-form event, it won't submit anywhere just yet
addCardForm.addEventListener('submit', handleAddCardSubmit);


// card Popup
cardPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(cardPopup);
});

/////////////////////////////////////////////////////////////////////////////

/////////////////////////  functions declarations   /////////////////////////



// this function opens the popup window
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// this function closes the popup window
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

/////////////////////////////////////////////////////////////////////////////

// this function shows the existing profile values on input fileds
function loadProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDetails.textContent;
  // profileNameInput.placeholder = profileName.textContent;
  // profileJobInput.placeholder = profileDetails.textContent;
}

/////////////////////////////////////////////////////////////////////////////

// this function edit the profile details by the user input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDetails.textContent = profileJobInput.value;
  closePopup(editProfilePopup);
}

/////////////////////////////////////////////////////////////////////////////

// this function edit the card values by the user input
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputCardData = evt.target.closest(".popup__form_type_add-card").querySelectorAll(".popup__input-field");
  const inputCard = createCard(inputCardData);
  addCard(inputCard);
  closePopup(addCardPopup);
}

/////////////////////////////////////////////////////////////////////////////


// Constructor function for a Card Objects
function Card(name, link) {
  this.name = name;
  this.link = link;
}


/////////////////////////////////////////////////////////////////////////////

// this function creates a new card object
function createCard(cardData) {
  const cardName = cardData[0].value;
  const cardLink = cardData[1].value;
  const newCard = new Card(cardName, cardLink);
  return newCard;
}

/////////////////////////////////////////////////////////////////////////////

function renderCard(cardToRender) {
  const renderedCard = cardElement.cloneNode(true);
  const cardDeleteButton = renderedCard.querySelector(".card__delete-button");
  const cardPicture = renderedCard.querySelector(".card__picture");
  const cardInfo = renderedCard.querySelector(".card__info");
  const cardTitle = cardInfo.querySelector(".card__title");
  const cardLikeButton = cardInfo.querySelector(".card__like-button");

  cardTitle.textContent = cardToRender.name;
  cardPicture.src = cardToRender.link;

  cardLikeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", function(evt) {
    evt.target.closest(".card").remove();
  });
  cardPicture.addEventListener("click", handlePictureClick);

  return renderedCard;
}



// this function gets a card, render and adds it to the DOM
// make its content appear on the gallery
function addCard(card) {
  gallery.prepend(renderCard(card));
}


/////////////////////////////////////////////////////////////////////////////

// This function opens a popup-card which contain close-up of a specific clicked-image
function handlePictureClick(evt) {
  const cardPicture = evt.target;
  const cardToPopup = evt.target.closest(".card");
  const cardInfo = cardToPopup.querySelector(".card__info");
  const cardTitle = cardInfo.querySelector(".card__title");

  cardPopupLink = cardPicture.src;
  cardPopupName = cardTitle.textContent;

  cardPictureDetails.textContent = cardPopupName;
  cardCloseUpPicture.src = cardPopupLink;
  cardCloseUpPicture.alt = "close up picture of " + cardPopupName;

  openPopup(cardPopup);
}


/////////////////////////////////////////////////////////////////////////////

// this function loads the initial Cards values using the addCard-function for each one of them
function loadInitialCards(initialCards) {
  initialCards.forEach((card) => {
    addCard(card);
  });
}

/////////////////////////////////////////////////////////////////////////////
