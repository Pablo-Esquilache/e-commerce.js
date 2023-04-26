import { onGetStock } from "./firebase.js";
import { listarCard } from "./listar_card.js";
import { printCart } from "./print_cart.js";
import { quantityCart } from "./quantity_cart.js";
import { formOrder } from "./form_order.js";
//import { listACard } from "./lista_card.js";

//TRAER ELEMENTOS DEL FIREBASE
window.addEventListener("DOMContentLoaded", async () => {
  onGetStock((querySnapshot) => {
    querySnapshot.forEach((el) => {
      //listACard({ id: el.id, ...el.data() })
      listarCard({ id: el.id, ...el.data() });
    });
  });
});

//FUNCION PARA PINTAR CARRITO
printCart;

//EVENTO PARA MOSTRAR CARRITO
const cart = document.getElementById("cart");
cart.addEventListener("click", printCart);

//FORMULARIO DE COMPRA
formOrder();

//CANTIDAD DE PRODUCTOS EN EL CARRITO
quantityCart();

//BUSCADOR DE PRODUCTOS
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#card_filter")) {
    if (e.key === "Escape") e.target.value = "";

    document
      .querySelectorAll(".card_detail")
      .forEach((el) =>
        el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ? (el.style.display = "flex")
          : (el.style.display = "none")
      );
  }
});
