import "../CSS/style.css";
import { store } from "./list.js";

const DOMSelectors = {
  container: document.querySelector(".main-box"),
};

//make into fucntion

function createItems(store) {
  store.forEach((value) =>
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
function filterItems(store) {
  let result = store.filter((value) => value.avaliability === "last one");
  createItems(result);
}

//filter
//sort
//includes

//filter
function filterPrice(store) {}

//createItems(store);
filterItems(store);
