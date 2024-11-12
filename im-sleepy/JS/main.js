import "../CSS/style.css";
import { store } from "./list.js";

const DOMSelectors = {
  container: document.querySelector(".main-box"),
  priceForm: document.getElementById("price-form"),
  priceValue: document.getElementById("price"),
  priceOutput: document.getElementById("result"),
  avaY: document.getElementById("y"),
  avaN: document.getElementById("n"),
  avaM: document.getElementById("m"),
  avaL: document.getElementById("l"),
  eyeDamage: document.getElementById("eye-damage"),
  light: document.getElementById("light"),
  dark: document.getElementById("dark"),
  theme: document.querySelector(".theme"),
  body: document.body,
  sortBy: document.getElementById("sort-by"),
};

//initial load up full view
createItems(store);
updateCards();

DOMSelectors.priceValue.addEventListener("input", updateCards);

const theyNeedToListen = [
  DOMSelectors.avaY,
  DOMSelectors.avaN,
  DOMSelectors.avaM,
  DOMSelectors.avaL,
  DOMSelectors.sortBy,
];

theyNeedToListen.forEach((selector) => {
  selector.addEventListener("change", updateCards);
});

function updateCards() {
  const priceLimit = parseFloat(DOMSelectors.priceValue.value);
  updatePrice(); //visual update
  const filteredItems = filterItems();

  const newArray = filteredItems.filter((item) => item.price <= priceLimit);

  const sortedArray = decideHowToSort(newArray);

  createItems(sortedArray);
}

function decideHowToSort(array) {
  const sortBy = DOMSelectors.sortBy.value;
  console.log(sortBy);

  if (sortBy === "name-sort") {
    array.sort(sortAlphabetically);
  } else if (sortBy === "price-lh") {
    array.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-hl") {
    array.sort((a, b) => b.price - a.price);
  }

  return array;
}

const themeButtons = [
  DOMSelectors.eyeDamage,
  DOMSelectors.light,
  DOMSelectors.dark,
];

themeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    DOMSelectors.body.className = button.dataset.theme;
  });
});

//search up what this means
function sortAlphabetically(a, b) {
  if (a.object[0] > b.object[0]) return 1;
  if (a.object[0] < b.object[0]) return -1;
  return 0;
}

//card spawner
function createItems(items) {
  DOMSelectors.container.innerHTML = "";
  items.forEach((value) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `  <div class= "container">
      <h2>${value.object}</h2>
      <img src="${value.imageUrl}" class="card-img" alt="">
      <h3>${value.description}</h3>
      <h4>$${value.price}</h4>
      <h4>${value.avaliability}</h4>
    </div>`
    )
  );
}

function filterItems() {
  let avaY = DOMSelectors.avaY.checked;
  let avaN = DOMSelectors.avaN.checked;
  let avaM = DOMSelectors.avaM.checked;
  let avaL = DOMSelectors.avaL.checked;

  let avaliability = [];

  if (avaY) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "IN STOCK")
    );
  }
  if (avaN) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "OUT OF STOCK")
    );
  }
  if (avaM) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "maybe in stock, idk")
    );
  }
  if (avaL) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "LAST ONE!! DON'T MISS OUT")
    );
  }

  return avaliability;
}

//visual ONLY
function updatePrice() {
  const priceLimit = parseFloat(DOMSelectors.priceValue.value); // acquire slider value
  DOMSelectors.priceOutput.value = priceLimit; // price viewer update
}

//all sorting methods:
//filter
//sort
//includes
//map
