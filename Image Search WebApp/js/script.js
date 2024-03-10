const ACCESSKEY = "l5vNw_7xdHWgQfxAwodbAz8vH0VHwDEoHObM32LUlR4";
const formElement = document.querySelector("form");
const searchInput = document.getElementById("img--name");
const searchResultcontainer = document.getElementById("search__result");
const showMoreButton = document.getElementById("show--more");

let inputData = "";
let pageNumber = 1;

async function searchImages() {
  inputData = searchInput.value;
  console.log(inputData);
  const URL = `https://api.unsplash.com/search/photos?pages=${pageNumber}&query=${inputData}&client_id=${ACCESSKEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  if (pageNumber === 1) {
    searchResultcontainer.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("aside");
    imageWrapper.classList.add("result__container");
    const resultImage = document.createElement("img");
    resultImage.src = result.urls.small;
    resultImage.alt = result.alt_description;
    const imageLinkWrapper = document.createElement("div");
    imageLinkWrapper.classList.add("url--title__container")
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(resultImage);
    imageLinkWrapper.appendChild(imageLink);
    imageWrapper.appendChild(imageLinkWrapper);
    searchResultcontainer.appendChild(imageWrapper);
  });

  pageNumber ++;


  if (pageNumber > 1) {
    showMoreButton.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault(); //Prevent form from reloading
  pageNumber = 1;
  searchImages();
});

showMoreButton.addEventListener('click', (event)=>{
    searchImages()
})
