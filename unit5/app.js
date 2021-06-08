let form = document.querySelector("form");
let container = document.querySelector(".container");

form.addEventListener("submit", handleSubmit);
container.addEventListener("click", handleRemove);

function handleSubmit(e) {
  e.preventDefault();

  // collects form values
  let imageSrc = e.target.image.value;
  let topText = e.target.text_top.value;
  let bottomText = e.target.text_bottom.value;

  //creates meme card
  addMeme(imageSrc, topText, bottomText);

  //reset forms
  e.target.reset();
}

function addMeme( imageSrc, topText, bottomText) {
  let memeRow = document.querySelector(".container > .row");

  let memeWrapper = document.createElement("div");
  memeWrapper.classList.add("col");

  let newMeme = document.createElement("div");
  newMeme.classList.add("meme");
  memeWrapper.appendChild(newMeme);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  newMeme.appendChild(overlay);

  let x = document.createElement("span");
  x.classList.add("spans", "spansx");
  overlay.appendChild(x);

  let pTop = document.createElement("p");
  pTop.innerText = topText;
  newMeme.appendChild(pTop);

  let img = document.createElement("img");
  img.src = imageSrc;
  newMeme.appendChild(img);

  let pBot = document.createElement("p");
  pBot.innerText = bottomText;
  newMeme.appendChild(pBot);

  //add new meme to document
  memeRow.appendChild(memeWrapper);
}

//remove meme
function handleRemove(e) {
  if (e.target.classList.contains("overlay")) {
    e.target.parentElement.parentElement.remove();
  }
}
