class Card {

  constructor(data, cardTemplateSelector, cardSettings) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSettings = cardSettings;

    const cardTitle = this._element.querySelector(this._cardSettings.cardTitleSelector);
    const cardPicture = this._element.querySelector(this._cardSettings.cardPictureSelector);

  }

  // sets up card markup
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSettings.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  // /** sets up card content and functionality
  generateCard() {

    this._element = this._getTemplate();


    cardTitle.textContent = this._name;
    cardPicture.src = this._link;
    cardPicture.alt = `picture of ${this._name}`;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const cardPicture = this._element.querySelector(this._cardSettings.cardPictureSelector);
    const cardLikeButton = this._element.querySelector(this._cardSettings.cardLikeButtonSelector);
    const cardDeleteButton = this._element.querySelector(this._cardSettings.cardDeleteButtonSelector);

    /** card popup Elements */
    const cardPopup = document.querySelector(this._cardSettings.cardPopupSelector);
    const cardPopupCloseButton = cardPopup.querySelector(this._cardSettings.cardPopupCloseButtonSelector);

    cardPicture.addEventListener("click", () => {
      this._handleOpenCardPopup();
    });

    cardPopupCloseButton.addEventListener("click", () => {
      this._handleCloseCardPopup();
    });

    cardLikeButton.addEventListener("click", () => {
      this._handleCardLikeClick(cardLikeButton);
    });

    cardDeleteButton.addEventListener("click", () => {
      this._handleCardDelete(cardDeleteButton);
    });

  }

  /** opens a popup-card which contain close-up and description
  of a specific clicked-image */
  _handleOpenCardPopup() {
    /** card popup Elements */
    const cardPopup = document.querySelector(this._cardSettings.cardPopupSelector);
    const cardPopupName = cardPopup.querySelector(this._cardSettings.cardPopupNameSelector);
    const cardPopupLink = cardPopup.querySelector(this._cardSettings.cardPopupLinkSelector);

    cardPopupName.textContent = this._name;
    cardPopupLink.src = this._link;
    cardPopupLink.alt = `close up picture of ${this._name}`;

    openPopup(cardPopup);
  }

  _handleCloseCardPopup() {
    closePopup(cardPopup);
  }

  _handleCardLikeClick(cardLikeButton) {
    cardLikeButton.classList.toggle(this._cardSettings.cardLikeButtonActiveClass);
  }

  _handleCardDelete(cardDeleteButton) {
    cardDeleteButton.closest(this._cardSettings.cardSelector).remove();
  }

  _addCardToGallery(gallerySelector) {
    gallerySelector.prepend(this.generateCard());
  }

}
