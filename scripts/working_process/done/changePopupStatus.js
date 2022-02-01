// DOM selecting
let content = document.querySelector("#content");
let profile = content.querySelector(".profile");
// for edit-button
let profile__info = profile.querySelector(".profile__info");
let profile__edit_button = profile__info.querySelector(".profile__edit-button");
// for close-button
let popup = profile.querySelector(".popup");
let popup__close_button = popup.querySelector(".popup__close-button");

// Event Listeners
profile__edit_button.addEventListener("click", changePopupStatus);
popup__close_button.addEventListener("click", changePopupStatus);

// this function changes the popup status - open or close
// close by defult, and changes status by click the buttons:
// edit(for open) / close(for close)
function changePopupStatus(){
  popup.classList.toggle("popup_opened");
}

/////////////////////////////////////////////////////////////////////////////
// brain process:
//
// initial state -> popup close -> only popup class -> basic markup
// click popup__edit-button -> popup open -> add popup_opened class
// click popup__close-button -> popup close -> remove popup_opened class
//
/////////////////////////////////////////////////////////////////////////////
//
// profile__edit_button.addEventListener("click", openPopupForm);
// function openPopupForm(){
//   popup.classList.add("popup_opened");
// }
//
// popup__close_button.addEventListener("click", closePopupForm);
// function closePopupForm(){
//   popup.classList.remove("popup_opened");
// }
/////////////////////////////////////////////////////////////////////////////
