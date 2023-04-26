
const card_detail_container = document.querySelector("#card_detail_container");
const template = document.querySelector("#template_card").content;
const fragment = document.createDocumentFragment();


export const listACard = (product) => {

let stock = product.stock;
let cantidad = 0;

template.querySelector("img").setAttribute("src", product.imagen);
template.querySelector("h3").textContent = product.marca + product.modelo;
template.querySelector("p").textContent = product.precio;
template.querySelector("span").textContent = product.cantidad;

let clone = document.importNode(template, true);
fragment.appendChild(clone);

card_detail_container.appendChild(fragment);
};
