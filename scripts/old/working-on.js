
// this function shows the defult values of input fileds on the add-card popup
function setInputValues() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  // cardNameInput.removeAttribute("value");
  // cardLinkInput.removeAttribute("value");
}


/////////////////////////////////////////////////////////////////////////////


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
