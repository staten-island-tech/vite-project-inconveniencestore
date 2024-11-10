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
};

//initial load up full view
createItems(store);
// listen for when ANY type of input is changed, then it runs update price
// update price will recall all filters, doesn't matter if it didn't change
//upload final array of cards that fit criteria

DOMSelectors.priceValue.addEventListener("input", updateCards);
DOMSelectors.avaY.addEventListener("change", updateCards);
DOMSelectors.avaN.addEventListener("change", updateCards);
DOMSelectors.avaM.addEventListener("change", updateCards);
DOMSelectors.avaL.addEventListener("change", updateCards);
updateCards();

function updateCards() {
  const priceLimit = parseFloat(DOMSelectors.priceValue.value);
  updatePrice(); //visual update
  const filteredItems = filterItems();

  const newArray = filteredItems.filter((item) => item.price <= priceLimit);
  /* const newArray = [];
  for (let i = 0; i < filteredItems.length; i++) {
    if (filteredItems[i].price <= priceLimit) {
      newArray.push(filteredItems[i]);
    }
  } */

  newArray.sort(sortAlphabetically);
  console.log(newArray);

  createItems(newArray);
}

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

//switch to includes for rubirc
//filters by avaliability
//returns y, n, m, l depending on what it has
//console.log(filterItems("IN STOCK"));
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
  DOMSelectors.priceOutput.value = priceLimit; // price viewer update ok wait why does it need to be =pricelimit huh
  //filterPrice(priceLimit); // filter price based on slider value
}

//number
/* function filterPrice(priceLimit) {
  let result = store.filter((value) => value.price <= priceLimit);
  return result;
} */

//all sorting methods:
//filter
//sort
//includes
//map
