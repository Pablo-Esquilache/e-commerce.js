import { carrito } from "./print_cart.js";

const quantity_cart = document.getElementById("quantity_cart");

export const quantityCart = () => {
  quantity_cart.style.display = "inline-block";
  const cart_quantity = carrito.reduce(
    (acc, product) => acc + product.cantidad,
    0
  );
  localStorage.setItem("cart_quantity", JSON.stringify(cart_quantity));
  quantity_cart.innerText = JSON.parse(localStorage.getItem("cart_quantity"));
};
