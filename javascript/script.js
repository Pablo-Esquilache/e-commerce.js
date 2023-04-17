//FIREBASE
import { setOrder, upudate_stok, onGetStock } from "./firebase.js";

//const productos = [];
const mercadopago = new MercadoPago(
  "TEST-daf72a44-7918-4460-8354-5485e52bfe07",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

//TRAER ELEMENTOS DEL FIREBASE
window.addEventListener("DOMContentLoaded", async () => {
  onGetStock((querySnapshot) => {
    //const querySnapshot = await getStock();
    querySnapshot.forEach((el) => {
      //productos.push({ id: el.id, ...el.data() })
      listar_card({ id: el.id, ...el.data() });
    });
  });
});

//LOCAL STORAGE
const local_storage = () => {
  localStorage.setItem("cart", JSON.stringify(carrito));
};

//CARD PRODUCTS
const card_detail_container = document.getElementById("card_detail_container");
const fragment = document.createDocumentFragment();

//CARRITO
let carrito = JSON.parse(localStorage.getItem("cart")) || [];
const cart = document.getElementById("cart");
const cart_container = document.getElementById("cart_modal_container");
const quantity_cart = document.getElementById("quantity_cart");
const modal_header = cart_container.querySelector(".modal_header");
const modal_body_container = cart_container.querySelector(
  ".modal_body_container"
);
const modal_footer = cart_container.querySelector(".modal_footer");
const btn_close_modal = modal_header.querySelector(".btn_close_modal");

//FORMULARIO
const form_modal_container = document.getElementById("form_modal_container");
const btn_close_form = form_modal_container.querySelector(".btn_close_form");
const form_order_container = form_modal_container.querySelector(
  "#form_order_container"
);

//LISTAR CARDS
//productos.forEach((product) => {
const listar_card = (product) => {
  let stock = product.stock;
  let cantidad = 0;
  let card_detail = document.createElement("div");
  card_detail.className = "card_detail";
  card_detail.innerHTML = "";
  card_detail.innerHTML += `
      <div class="img_container">
        <img src="${product.imagen}">
      </div>
      <div class="text_container">
        <h3>${product.marca} ${product.modelo}</h3>
        <p>$ ${product.precio}</p>
      </div>
      <div class="option_btn_container">
      <div class="option_btn">
      <p>Talle</p>
        <select class="selection_talle" id="selection_talle">
          <option value="38">38</option>
          <option value="40">40</option>
          <option value="42">42</option>
          <option value="44">44</option>
        </select>
      </div>
      <div class="btn_count">
      <p>Cantidad</p>
        <button class="btn_min">-</button>
        <span class="input_count">${cantidad}</span>
        <button class="btn_max">+</button>
      </div>
      </div>
      <button class="btn_add_cart">Añadir al carrito</button>
    `;
  fragment.appendChild(card_detail);
  card_detail_container.appendChild(fragment);

  //ITEM COUNT
  let btn_min = card_detail.querySelector(".btn_min");
  btn_min.addEventListener("click", () => {
    if (stock === 0) {
      cantidad = 0;
      btn_min.setAttribute("disabled", "disabled");
      btn_max.setAttribute("disabled", "disabled");
    } else if (cantidad <= 1) {
      cantidad = 1;
      btn_min.removeAttribute("disabled", "disabled");
    } else {
      cantidad--;
      input_count.innerText = cantidad;
    }
  });
  let input_count = card_detail.querySelector(".input_count");
  let btn_max = card_detail.querySelector(".btn_max");
  btn_max.addEventListener("click", () => {
    if (cantidad >= stock) {
      btn_max.setAttribute("disabled", "disabled");
    } else {
      cantidad++;
      input_count.innerText = cantidad;
    }
  });

  //BTN AÑADIR AL CARRITO
  let btn_add_cart = card_detail.querySelector(".btn_add_cart");
  btn_add_cart.addEventListener("click", () => {
    if (cantidad > 0) {
      //TALLE
      let selection_size = card_detail.querySelector("#selection_talle");
      let size = selection_size.value;
      //CANTIDAD
      const repeat = carrito.some(
        (repeat_prduct) => repeat_prduct.id === product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad = cantidad;
          }
        });
      } else {
        carrito.push({
          imagen: product.imagen,
          marca: product.marca,
          modelo: product.modelo,
          precio: product.precio,
          talle: size,
          id: product.id,
          cantidad: cantidad,
          stock: product.stock,
        });
      }
      quantity_cart_fun();
      local_storage();
    }
  });
};

//CARRITO
const print_cart = () => {
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
        quantity_cart_fun();
        local_storage();
        print_cart();
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
cart.addEventListener("click", print_cart);

//FORMULARIO COMPRA
btn_close_form.addEventListener("click", () => {
  cart_container.style.display = "flex";
  form_modal_container.style.display = "none";
});
//FORMULARIO
const form_order = form_order_container.querySelector("#form");
form_order.addEventListener("submit", (e) => {
  e.preventDefault();

  // let name = form_order.querySelector("#name");
  // let apellido = form_order.querySelector("#apellido");
  // let localidad = form_order.querySelector("#location");
  // let codigo_postal = form_order.querySelector("#code");
  // let direccion = form_order.querySelector("#direction");
  // let email = form_order.querySelector("#email");

  const compra = carrito.map((pro) => {
    return {
      id: pro.id,
      title: pro.marca + pro.modelo,
      unit_price: parseFloat(pro.precio),
      quantity: parseFloat(pro.cantidad),
    };
  });

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
    .catch(function () {
      alert("Unexpected error");
    });

  // setOrder(
  //   name.value,
  //   apellido.value,
  //   localidad.value,
  //   codigo_postal.value,
  //   direccion.value,
  //   email.value,
  //   compra
  // );

  // carrito.forEach((pro) => {
  //   let stok_final = pro.stock - pro.cantidad;
  //   let stock_id = pro.id;
  //   upudate_stok(stock_id, stok_final);
  // });

  // form_order.reset();

  // carrito = [];
  // modal_body_container.innerHTML = "";
  // function close() {
  //   cart_container.style.display = "none";
  //   form_modal_container.style.display = "none";
  // }
  // setTimeout(close, 1500);
  // local_storage();
  // quantity_cart_fun();
  // print_cart();
});

//FUNCION PARA CONTAR LA CANTIDAD DE ELEMENTOS
const quantity_cart_fun = () => {
  quantity_cart.style.display = "inline-block";
  const cart_quantity = carrito.reduce(
    (acc, product) => acc + product.cantidad,
    0
  );
  localStorage.setItem("cart_quantity", JSON.stringify(cart_quantity));
  quantity_cart.innerText = JSON.parse(localStorage.getItem("cart_quantity"));
};
quantity_cart_fun();

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
