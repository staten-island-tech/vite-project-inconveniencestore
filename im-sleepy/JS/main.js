import "../CSS/style.css";
import { store } from "./list.js";

const DOMSelectors = {
  container: document.querySelector(".main-box"),
};

store.forEach((store) =>
  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    `  <div class= "container">
    <h2>${store.object}</h2>
    <img src="${store.imageUrl}" alt="">
    <h3>${store.description}</h3>
    <h3>$${store.price}</h3>
  </div>`
  )
);
