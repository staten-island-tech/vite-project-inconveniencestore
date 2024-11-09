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

/* let arr = priceValue,
  avaY,
  avaN,
  avaM,
  avaL;

arr.forEach (key => {DOMselectors[key].addEventListener("") */

DOMSelectors.priceValue.addEventListener("input", updateCards);
DOMSelectors.avaY.addEventListener("change", updateCards);
DOMSelectors.avaN.addEventListener("change", updateCards);
DOMSelectors.avaM.addEventListener("change", updateCards);
DOMSelectors.avaL.addEventListener("change", updateCards);
updateCards();

function updateCards() {
  const priceLimit = parseFloat(DOMSelectors.priceValue.value);
  updatePrice(); //visual update

  let filteredItems = filterItems();
  console.log(filteredItems);

  let criteriaMet = filterPrice(priceLimit, filteredItems); //needs to store into variable
  //filterItems(sortCategory);

  createItems(criteriaMet);
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
  let avaY = DOMSelectors.avaY.value;
  let avaN = DOMSelectors.avaN.value;
  let avaM = DOMSelectors.avaM.value;
  let avaL = DOMSelectors.avaL.value;

  let avaliability = [];

  if (avaY.checked) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "IN STOCK")
    );
  }
  if (avaN.checked) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "OUT OF STOCK")
    );
  }
  if (avaM.checked) {
    avaliability = avaliability.concat(
      store.filter((item) => item.avaliability === "maybe in stock, idk")
    );
  }
  if (avaL.checked) {
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
function filterPrice(priceLimit) {
  let result = store.filter((value) => value.price <= priceLimit);
  return result;
}

//all sorting methods:
//filter
//sort
//includes
//map
