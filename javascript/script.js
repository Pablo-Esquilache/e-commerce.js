//FIREBASE
import { getStock, setOrder } from "./firebase.js";

//TRAER ELEMENTOS DEL FIREBASE
window.addEventListener("DOMContentLoaded", async () => {
  const querySnapshot = await getStock();
  querySnapshot.forEach((el) => {
    listar_card({ id: el.id, ...el.data() });
  });
});

//LOCAL STORAGE
const local_storage = () => {
  localStorage.setItem("cart", JSON.stringify(carrito));
};

//CARD PRODUCTS
const card_detail_container = document.getElementById("card_detail_container");
let cantidad = 1;
//const filter_remeras = document.getElementById("filter_remeras");

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
const form_order_container = form_modal_container.querySelector("#form_order_container");

//LISTAR CARDS
const listar_card = (product) => {
  let stock = product.stock;
  let card_detail = document.createElement("div");
  card_detail.className = "card_detail";
  card_detail.innerHTML = `
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
        <span class="input_count">1</span>
        <button class="btn_max">+</button>
      </div>
      </div>
      <button class="btn_add_cart">Añadir al carrito</button>
    `;
  card_detail_container.append(card_detail);

  //ITEM COUNT
  let btn_min = card_detail.querySelector(".btn_min");
  btn_min.addEventListener("click", () => {
    cantidad--;
    if (cantidad <= 1) {
      cantidad = 1;
    }
    input_count.innerText = cantidad;
    btn_max.removeAttribute("disabled", "disabled");
  });
  let input_count = card_detail.querySelector(".input_count");
  let btn_max = card_detail.querySelector(".btn_max");
  btn_max.addEventListener("click", () => {
    cantidad++;
    if (cantidad >= stock) {
      btn_max.setAttribute("disabled", "disabled");
    }
    //btn_max.removeAttribute("disabled", "disabled");
    input_count.innerText = cantidad;
  });

  //BTN AÑADIR AL CARRITO
  let btn_add_cart = card_detail.querySelector(".btn_add_cart");
  btn_add_cart.addEventListener("click", () => {
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
    txt_cart_vacio.innerHTML = `<p>Su carrito esta vacio, <a href="./index.html">vuelva al shop..</a></p>`;
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
      form_modal_container.style.display = "block";
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
form_order.addEventListener('submit', (e) => {
   e.preventDefault();

  const compra = carrito.map((pro) => {
    return {
      id: pro.id,
      title: pro.marca + pro.modelo,
      unit_price: pro.precio,
      quantity: pro.cantidad
    };
  });
console.log("HOla");

  fetch('http://localhost:3000/checkout', {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(compra[0]),
  });
});


//   let name = form_order.querySelector("#name");
//   let apellido = form_order.querySelector("#apellido");
//   let localidad = form_order.querySelector("#location");
//   let codigo_postal = form_order.querySelector("#code");
//   let direccion = form_order.querySelector("#direction");
//   let email = form_order.querySelector("#email");

//   setOrder(
//     name.value,
//     apellido.value,
//     localidad.value,
//     codigo_postal.value,
//     direccion.value,
//     email.value,
//     compra
//   );
//   carrito = [];
//   modal_body_container.innerHTML = "";
//   quantity_cart_fun();
//   local_storage();
//   print_cart();
//   form_order.reset();
//   function close() {
//     cart_container.style.display = "none";
//     form_modal_container.style.display = "none";
//   }
//   //setTimeout(close, 1500);
// });

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
