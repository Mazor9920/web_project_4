/////////////////////////////////////////////////////////////////////////////

/////////////////////////       DOM selecting       /////////////////////////

let content = document.querySelector("#content");

///// profile section /////
let profile = content.querySelector(".profile");
let profileInfo = profile.querySelector(".profile__info");
let profileEditButton = profileInfo.querySelector(".profile__edit-button");
let addCardButton = profile.querySelector(".profile__add-button");

// profile initial values
let profileName = profileInfo.querySelector(".profile__name");
let profileDetails = profileInfo.querySelector(".profile__details");

///// edit-profile popup /////
let editProfilePopup = document.querySelector("#edit-profile-popup");
let editProfilePopupContainer = editProfilePopup.querySelector(".popup__container");
let editProfileCloseButton = editProfilePopupContainer.querySelector(".popup__close-button");

let editProfileForm = editProfilePopupContainer.querySelector(".popup__form");
let editProfileFormTitle = editProfileForm.querySelector(".popup__title");
let editProfileSaveButton = editProfileForm.querySelector(".popup__submit-button");

// temp input fields
let profileNameInput = editProfileForm.querySelector(".popup__input-field_value_profile-name");
let profileJobInput = editProfileForm.querySelector(".popup__input-field_value_profile-job");


///// gallery section /////
let gallery = content.querySelector(".gallery");

///// add-card popup /////
let addCardPopup = document.querySelector("#add-card-popup");
let addCardPopupContainer = addCardPopup.querySelector(".popup__container");
let addCardCloseButton = addCardPopupContainer.querySelector(".popup__close-button");

let addCardForm = addCardPopupContainer.querySelector(".popup__form");
let addCardFormTitle = addCardForm.querySelector(".popup__title");
let addCardCreateButton = addCardForm.querySelector(".popup__submit-button");

// user input fields
let cardNameInput = addCardForm.querySelector(".popup__input-field_value_card-name");
let cardLinkInput = addCardForm.querySelector(".popup__input-field_value_card-link");
/////////////////////////////////////////////////////////////////////////////

/////////////////////////      Event Listeners      /////////////////////////

///// edit-profile popup /////

profileEditButton.addEventListener("click", function(evt) {
  changePopupStatus(editProfilePopup);
  loadProfile();
});

editProfileCloseButton.addEventListener("click", function(evt) {
  changePopupStatus(editProfilePopup);
});

// watch the submit-form event, it won't submit anywhere just yet
editProfileForm.addEventListener('submit', handleProfileFormSubmit);


///// add-card popup /////

addCardButton.addEventListener("click", function(evt) {
  changePopupStatus(addCardPopup);
  setInputValues();
});

addCardCloseButton.addEventListener("click", function(evt) {
  changePopupStatus(addCardPopup);
});

// watch the submit-form event, it won't submit anywhere just yet
addCardForm.addEventListener('submit', handleAddCardSubmit);



/////////////////////////////////////////////////////////////////////////////

/////////////////////////      functions calls      /////////////////////////

loadInitialCards(initialCards);

/////////////////////////////////////////////////////////////////////////////

/////////////////////////  functions declarations   /////////////////////////

// this function changes the popup status - open or close
// close by defult, and changes status by click the buttons:
// edit(for open) / close(for close)
function changePopupStatus(popupElement) {
  popupElement.classList.toggle("popup_opened");
}

/////////////////////////////////////////////////////////////////////////////

// this function shows the existing profile values on input fileds
function loadProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDetails.textContent;
}

/////////////////////////////////////////////////////////////////////////////

// this function shows the defult values of input fileds on the add-card popup
function setInputValues() {
  cardNameInput.value = "Titel";
  cardLinkInput.value = "Image link";
}

/////////////////////////////////////////////////////////////////////////////

// this function edit the profile details by the user input
function handleProfileFormSubmit(evt) {
  // stops the browser from submitting the form in the default way.
  evt.preventDefault();

  // Insert new values
  profileName.textContent = profileNameInput.value;
  profileDetails.textContent = profileJobInput.value;

  //close edit-form Popup
  changePopupStatus(editProfilePopup);
}

/////////////////////////////////////////////////////////////////////////////

// this function edit the card values by the user input
function handleAddCardSubmit(evt) {
  // stops the browser from submitting the form in the default way.
  evt.preventDefault();

  // Insert new values
  addCard(cardNameInput.value, cardLinkInput.value);

  //close add-card form Popup
  changePopupStatus(addCardPopup);
}

/////////////////////////////////////////////////////////////////////////////

// this function loads the initial Cards values using the addCard-function for each one of them
function loadInitialCards(initialCards) {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

/////////////////////////////////////////////////////////////////////////////

// this function gets input card values and adds a new card element to the DOM
function addCard(name, link) {

  // select the template using id
  const cardTemplate = document.querySelector("#card-template").content;

  // clone the content of the template tag
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // to add content & compile it
  const cardInfo = cardElement.querySelector(".card__info");
  const cardTitle = cardInfo.querySelector(".card__title");
  cardTitle.textContent = name;
  const cardPicture = cardElement.querySelector(".card__picture");
  cardPicture.src = link;

  // Create a card-popup handler
  cardPicture.addEventListener("click", handlePictureClick);

  // Create a Like handler
  const cardLikeButton = cardInfo.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function(evt) {
    // event-target contain the specific clicked-on like-button
    evt.target.classList.toggle("card__like-button_active");
  });

  // Create an delete handler
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function(evt) {
    // event-target contain the specific clicked delete-button
    // delete the all cardElement - it's parent
    evt.target.parentElement.remove();
  });

  // make cardElement content appear on the page = add it to the DOM
  const gallery = content.querySelector(".gallery");
  gallery.prepend(cardElement);
}

/////////////////////////////////////////////////////////////////////////////


// This function creates a close-up of a specific clicked-image using template card
function handlePictureClick(evt) {
  // event-target contain the specific clicked-picture to popup
  const pictureLink = evt.target.src;
  // card__title is nephew of card__picture
  const pictureName = evt.target.nextElementSibling.firstElementChild.textContent;

  // select the template using id
  const cardPopupTemplate = document.querySelector("#card-popup-template").content;
  // clone the content of the template tag
  const cardPopup = cardPopupTemplate.querySelector('.card-popup').cloneNode(true);

  // to add content & compile it
  const cardPopupContainer = cardPopup.querySelector(".card-popup__container");

  const cardPopupPicture = cardPopupContainer.querySelector(".card-popup__picture");
  const cardPopupTitle = cardPopupContainer.querySelector(".card-popup__title");
  cardPopupPicture.src = pictureLink;
  cardPopupTitle.textContent = pictureName;

  // Create an close handler
  const cardPopupCloseButton = cardPopupContainer.querySelector(".card-popup__close-button");
  cardPopupCloseButton.addEventListener("click", handleCardPopupClose);

  // make cardElement content appear on the page = add it to the DOM
  const content = document.querySelector("#content");
  content.prepend(cardPopup);
  changeCardStatus(cardPopup);

}


// this function closes the popup card
function handleCardPopupClose(evt) {
  // event-target contain the clicked-close-button of the specific card-popup = grandparent
  const cardPopup = evt.target.parentElement.parentElement;
  changeCardStatus(cardPopup);
  // evt.target.parentElement.parentElement.remove();
}


// this function changes the card-popup status - open or close
// close by defult, and changes status by click the buttons:
// card-picture(for open) / close(for close)
function changeCardStatus(cardElement) {
  cardElement.classList.toggle("card-popup_opened");
}



// ///////////////////////////////////////////////////////////////////////////
//
//     EventListener handle Syntax
//
//     anyVar.addEventListener('anyEvent', handleFunctionName);
//     function handleFunctionName(evt) {
//     }
//
//
//     card Dom:
//     gallery -> Lots of Card Elements by cardTemplate
//     each cardElement -> cardDeleteButton & cardLinkInput & cardInfo
//     cardInfo -> cardNameInput & cardLikeButton
//
//     gallery > cards by template / objects array > card
//     card = btn + img + info
//                         info = title + like
//
// /////////////////////////////////////////////////////////////////////////////
