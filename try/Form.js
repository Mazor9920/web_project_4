// replaceWith()

<form action="/action_page.php" name="edit-profile-form" class="form popup__form" novalidate>
  <h3 class="form__title form__title_placed_edit-profile-form">Edit profile</h3>

  <label class="form__field">
    <input type="text" id="profile-name-input" class="form__input form__input_value_profile-name" name="profile-name" minlength="2" maxlength="40" required>
    <span class="form__placeholder profile-name-input-placeholder">Name</span>
    <span class="form__input-error profile-name-input-error"></span>
  </label>

  <label class="form__field">
    <input type="text" id="profile-job-input" class="form__input form__input_value_profile-job" name="profile-job" minlength="2" maxlength="200" required>
    <span class="form__placeholder profile-job-input-placeholder">About me</span>
    <span class="form__input-error profile-job-input-error"></span>
  </label>

  <button type="submit" class="form__submit-button form__submit-button_value_profile-save">Save</button>
</form>

////////////////////////////////////////////////////////////////////////////////////

<form action="/action_page.php" name="add-card-form" class="form popup__form" novalidate>
  <h3 class="form__title form__title_placed_add-card-form">New place</h3>

  <label class="form__field">
    <input type="text" id="card-name-input" class="form__input form__input_value_card-name" name="card-name" minlength="1" maxlength="30" required>
    <span class="form__placeholder card-name-input-placeholder">Title</span>
    <span class="form__input-error card-name-input-error"></span>
  </label>

  <label class="form__field">
    <input type="url" id="card-link-input" class="form__input form__input_value_card-link" name="card-link" required>
    <span class="form__placeholder card-link-input-placeholder">Image link</span>
    <span class="form__input-error card-link-input-error"></span>
  </label>

  <button type="submit" class="form__submit-button form__submit-button_value_create-card">Create</button>
</form>

class Form{

}


class x {
  constructor(data, cardTemplateSelector, cardSettings) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSettings = cardSettings;
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
    //get all template content to html
    this._element = this._getTemplate();

    // if it's already in html


    const cardTitle = this._element.querySelector(this._cardSettings.cardTitleSelector);
    const cardPicture = this._element.querySelector(this._cardSettings.cardPictureSelector);

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


    cardPopupCloseButton.addEventListener("click", () => {
      this._handleCloseCardPopup();
    });


  }


  _handleCloseCardPopup() {
    closePopup(cardPopup);
  }

}
