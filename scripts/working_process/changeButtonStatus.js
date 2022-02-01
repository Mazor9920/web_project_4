let card__like_button = document.querySelector(".card__like-button");
card__like_button.addEventListener("click", changeButtonStatus);

function changeButtonStatus() {
  card__like_button.classList.toggle("card__like-button_disabled");
}


// html

// <button class="card__like-button card__like-button_disabled">card__like-button</button>


// css

// .card__like-button {
// cursor: pointer;
// background-color:red;
// }
//
// .card__like-button_disabled {
// background-color: black;
// }
