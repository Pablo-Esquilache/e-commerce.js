import { quantityCart } from "./quantity_cart.js";

export let carrito = JSON.parse(localStorage.getItem("cart")) || [];
export const updateCart = (newCart) => {
  carrito = newCart;
};

export const local_storage = () => {
  localStorage.setItem("cart", JSON.stringify(carrito));
};

export const cart_container = document.getElementById("cart_modal_container");
export const modal_body_container = cart_container.querySelector(
  ".modal_body_container"
);
const modal_footer = cart_container.querySelector(".modal_footer");
const modal_header = cart_container.querySelector(".modal_header");
const btn_close_modal = modal_header.querySelector(".btn_close_modal");

export const printCart = () => {
  //LIMPIAR CARRITO
  modal_body_container.innerHTML = "";
  //BOTON PARA ABRIR CARRITO
  cart_container.style.display = "flex";
  //BOTON PARA CERRAR CARRITO
  btn_close_modal.addEventListener("click", () => {
    cart_container.style.display = "none";
  });
  //FOREACH PARA PINTAR CARRITO
  if (carrito.length === 0) {
    let txt_cart_vacio = document.createElement("div");
    txt_cart_vacio.innerHTML = `<p class="msj_vacio">Su carrito esta vacio, <a href="./index.html">vuelva al shop..</a></p>`;
    modal_body_container.append(txt_cart_vacio);
  } else {
    carrito.forEach((product) => {
      let card_body_cart = document.createElement("div");
      card_body_cart.className = "card_body_cart";
      card_body_cart.innerHTML += `
          <img src="${product.imagen}"
          <p><b>${product.marca} ${product.modelo}</b></p>
          <p>Precion Unitario: <b>$${product.precio}</b></p>
          <p>Talle: <b>${product.talle}</b></p>
          <p>Cantidad: <b>${product.cantidad}</b></p>
          <p>Subtotal: <b>$${product.precio * product.cantidad}</b></p>
          <button class="btn_delete">❌</button>
          `;
      modal_body_container.append(card_body_cart);
      //BOTON PARA ELIMINAR ELEMENTOS
      let eliminar = card_body_cart.querySelector(".btn_delete");
      eliminar.addEventListener("click", () => {
        const found_id = carrito.find((el) => el.id === product.id);
        carrito = carrito.filter((cartid) => cartid !== found_id);
        quantityCart();
        local_storage();
        printCart();
      });
    });
  }
  //FUNCION PARA SUMAR TOTAL COMPRA
  const total_compra = carrito.reduce(
    (acc, product) => acc + product.precio * product.cantidad,
    0
  );
  //MODAL FOOTER PARA CARRITO
  if (carrito.length === 0) {
    modal_footer.innerHTML = "";
  } else {
    modal_footer.innerHTML = `
      <p>Total a pagar: <b>$${total_compra}</b></p>
      `;
    //BOTON DE INICAR COMPRA
    let btn_iniciar_compra = document.createElement("button");
    btn_iniciar_compra.className = "btn_iniciar_compra";
    btn_iniciar_compra.innerText = "Iniciar compra";
    modal_footer.append(btn_iniciar_compra);
    btn_iniciar_compra.addEventListener("click", () => {
      cart_container.style.display = "none";
      form_modal_container.style.display = "flex";
    });
  }
};
