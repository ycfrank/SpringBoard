let form = document.querySelector("form");
let container = document.querySelector(".container");

form.addEventListener("submit", handleSubmit);
container.addEventListener("click", handleRemove);

function handleSubmit(e) {
  e.preventDefault();

  // grab values from form
  let imageSrc = e.target.image.value;
  let textTop = e.target.topText.value;
  let textBottom = e.target.bottomText.value;

  // add card for meme
  addMeme(imageSrc, textTop, textBottom);

  // reset form
  e.target.reset();
}

function addMeme(imageSrc, textTop, textBottom) {
  let memeRow = document.querySelector(".container > .row");

  // build HTML structure for new meme
  let memeWrapper = document.createElement("div");
  memeWrapper.classList.add("col");

  let newMeme = document.createElement("div");
  newMeme.classList.add("meme");
  memeWrapper.appendChild(newMeme);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  newMeme.appendChild(overlay);

  let x = document.createElement("span");
  x.classList.add("oi", "oi-x");
  overlay.appendChild(x);

  let pTop = document.createElement("p");
  pTop.innerText = textTop;
  newMeme.appendChild(pTop);

  let img = document.createElement("img");
  img.src = imageSrc;
  newMeme.appendChild(img);

  let pBottom = document.createElement("p");
  pBottom.innerText = textBottom;
  newMeme.appendChild(pBottom);

  // append new meme to DOM
  memeRow.appendChild(memeWrapper);
}

function handleRemove(e) {
  if (e.target.classList.contains("overlay")) {
    e.target.parentElement.parentElement.remove();
  }
}
