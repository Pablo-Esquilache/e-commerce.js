import { setOrder, upudate_stok } from "../javascript/firebase.js";
import { mercado_pago } from "./mercadopago.js";
import { carrito, updateCart } from "./print_cart.js";
import { modal_body_container } from "./print_cart.js";
import { local_storage } from "./print_cart.js";
import { quantityCart } from "./quantity_cart.js";
import { cart_container } from "./print_cart.js";
import { printCart } from "./print_cart.js";

const form_modal_container = document.getElementById("form_modal_container");
const form_order_container = form_modal_container.querySelector(
  "#form_order_container"
);
const btn_close_form = form_modal_container.querySelector(".btn_close_form");
const form_order = form_order_container.querySelector("#form");

export const formOrder = () => {
  form_order.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = form_order.querySelector("#name");
    let apellido = form_order.querySelector("#apellido");
    let localidad = form_order.querySelector("#location");
    let codigo_postal = form_order.querySelector("#code");
    let direccion = form_order.querySelector("#direction");
    let email = form_order.querySelector("#email");

    const compra = carrito.map((pro) => {
      return {
        id: pro.id,
        title: pro.marca + pro.modelo,
        unit_price: pro.precio,
        quantity: pro.cantidad,
      };
    });

    mercado_pago(compra);

    setOrder(
      name.value,
      apellido.value,
      localidad.value,
      codigo_postal.value,
      direccion.value,
      email.value,
      compra
    );

    carrito.forEach((pro) => {
      let stok_final = pro.stock - pro.cantidad;
      let stock_id = pro.id;
      upudate_stok(stock_id, stok_final);
    });

    form_order.reset();

    updateCart([]);
    //carrito = [];
    modal_body_container.innerHTML = "";
    function close() {
      cart_container.style.display = "none";
      form_modal_container.style.display = "none";
    }
    setTimeout(close, 1500);
    local_storage();
    quantityCart();
    printCart();
  });
};

btn_close_form.addEventListener("click", () => {
  cart_container.style.display = "flex";
  form_modal_container.style.display = "none";
});
