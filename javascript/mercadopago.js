import { upudate_stok } from "../javascript/firebase.js";
import { formOrderDate } from "./form_order_date.js";
import {
  updateCart,
  modal_body_container,
  local_storage,
  printCart, 
  carrito,
} from "./print_cart.js";
import { quantityCart } from "./quantity_cart.js";

const mercadopago = new MercadoPago(
  "TEST-daf72a44-7918-4460-8354-5485e52bfe07",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

export function mercado_pago(compra) {
  fetch("http://localhost:8080/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(compra),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);
    })
    .then(function () {
      carrito.forEach((pro) => {
        let stok_final = pro.stock - pro.cantidad;
        let stock_id = pro.id;
        upudate_stok(stock_id, stok_final);
      });
      formOrderDate()
      updateCart([]);
      modal_body_container.innerHTML = "";
      local_storage();
      quantityCart();
      printCart();
    })
    .catch(function () {
      alert("Unexpected error");
    });
}

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      "wallet",
      "button-checkout", // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId,
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {},
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
