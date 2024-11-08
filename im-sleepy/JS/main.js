import "../CSS/style.css";
import { store } from "./list.js";

const DOMSelectors = {
  container: document.querySelector(".main-box"),
  priceForm: document.getElementById("price-form"),
  priceValue: document.getElementById("price"),
  priceOutput: document.getElementById("result"),
};

//make into fucntion

function updatePrice() {
  const priceLimit = parseFloat(DOMSelectors.priceValue.value); // acquire slider value
  DOMSelectors.priceOutput.value = priceLimit; // price view update
  filterPrice(priceLimit); // filter price based on slider value
}

createItems(store);
// listen for when price updated
DOMSelectors.priceValue.addEventListener("input", updatePrice);

form.addEventListener("input", updatePrice);

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
    </div>`
    )
  );
}

//includes
function filterItems(sortCategory) {
  let result = store.filter((value) => value.avaliability === sortCategory);
  createItems(result);
}

//filter
//sort
//includes

//filter
function filterPrice(priceLimit) {
  let result = store.filter((value) => value.price <= priceLimit);
  createItems(result);
}
