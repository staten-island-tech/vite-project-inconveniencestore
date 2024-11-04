import "../CSS/style.css";
import { store } from "./list.js";

const DOMSelectors = {
  container: document.querySelector(".main-box"),
};

store.forEach((element) =>
  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    `<div class= "container">
    <h2>${element.object}</h2>
    <img src="${element.imageUrl}" alt="">
    <h3>$${element.price}</h3>
  </div>`
  )
);
