//FIREBASE
import { getStock } from "./firebase.js";

//CARD PRODUCTS
const card_container = document.getElementById("card_container");

//CARRITO
//const card = document.getElementById("cart");
const cart_container = document.getElementById("cart_modal_container");
let carrito = JSON.parse(localStorage.getItem("cart")) || [];
let cantidad = 1;
const quantity_cart = document.getElementById("quantity_cart");

//LOCAL STORAGE
const local_storage = () => {
  localStorage.setItem("cart", JSON.stringify(carrito));
};

//FORMULARIO
const form_modal_container = document.getElementById("form_modal_container");

//TRAER ELEMENTOS DEL FIREBASE
window.addEventListener("DOMContentLoaded", async () => {
  const querySnapshot = await getStock();
  querySnapshot.forEach((el) => {
    listar_card({ id: el.id, ...el.data() });
  });
});

//LISTAR CARDS
const listar_card = (product) => {
  let card = document.createElement("div");
  card.className = "card_shop";
  card.innerHTML = `
      <div class="img_container">
        <img src="${product.imagen}">
      </div>
      <div class="text_container">
        <h3>${product.marca} ${product.modelo}</h3>
        <p>$ ${product.precio}</p>
      </div>
      <div class="btn_count">
        <button class="btn_min">-</button>
        <span class="input_count">1</span>
        <button class="btn_max">+</button>
      </div>
    `;
  card_container.append(card);
    //ITEM COUNT
  let btn_min = card.querySelector(".btn_min");
  btn_min.addEventListener("click", () => {
    cantidad--;
    if (cantidad <= 1) {
      cantidad = 1;
    }
    input_count.innerText = cantidad;
  });

  let input_count = card.querySelector(".input_count");

  let btn_max = card.querySelector(".btn_max");
  btn_max.addEventListener("click", () => {
    cantidad++;
    input_count.innerText = cantidad;
  });
    //BTN AÑADIR AL CARRITO
  let btn_add_cart = document.createElement("button");
  btn_add_cart.innerText = "Añadir al carrito";
  btn_add_cart.className = "btn_add_cart";
  card.append(btn_add_cart);
    //FUNCION PARA INCORPORAR PRODUCTOS AL ARRAY DEL CARRITO
  btn_add_cart.addEventListener("click", () => {
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
  cart_container.innerHTML = "";
  cart_container.style.display = "flex";
  //HEADER CARRITO
  let modal_header = document.createElement("div");
  modal_header.className = "modal_header";
  modal_header.innerHTML = `
            <h1>Carrito</h1>
            <button class="btn_close_modal">❌</button>`;
  cart_container.append(modal_header);
  //BOTON PARA CERRAR CARRITO
  let btn_close_modal = modal_header.querySelector(".btn_close_modal");
  btn_close_modal.addEventListener("click", () => {
    cart_container.style.display = "none";
  });
  //FOREACH PARA PINTAR CARRITO
  if (carrito.length === 0) {
    let txt_cart_vacio = document.createElement("p");
    txt_cart_vacio.innerText = "Su carrito esta vacio, vuelva al shop...";
    cart_container.append(txt_cart_vacio);
  } else {
    carrito.forEach((product) => {
      let modal_body = document.createElement("div");
      modal_body.className = "modal_body";
      modal_body.innerHTML += `
    <img src="${product.imagen}"
    <h3>${product.marca}</h3>
    <h4>${product.modelo}</h4>
    <p>$ ${product.precio}</p>
    <p>${product.cantidad}</p>
    <p>Subtotal: ${product.precio * product.cantidad}</p>
    <button class="btn_delete">❌</button>
    `;
      cart_container.append(modal_body);
      //BOTON PARA ELIMINAR ELEMENTOS
      let eliminar = modal_body.querySelector(".btn_delete");
      eliminar.addEventListener("click", delete_product);
    });
    //FUNCION PARA SUMAR TOTAL COMPRA
    const total_compra = carrito.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );
    //MODALFOOTER PARA CARRITO
    const modal_footer = document.createElement("div");
    modal_footer.className = "modal_footer";
    modal_footer.innerHTML = `
  <p>Total a pagar $ ${total_compra}</p>
  `;
    cart_container.append(modal_footer);
    //BOTON DE INICAR COMPRA
    let btn_iniciar_compra = document.createElement("button");
    btn_iniciar_compra.className = "btn_iniciar_compra";
    btn_iniciar_compra.innerText = "Iniciar compra";
    modal_footer.append(btn_iniciar_compra);
    btn_iniciar_compra.addEventListener("click", Iniciar_compar);
    let btn_close_form = document.createElement('button');
    btn_close_form.className = 'btn_close_form';
    btn_close_form.innerText = '❌';
    form_modal_container.append(btn_close_form);
    btn_close_form.addEventListener('click', () => {
      cart_container.style.display = "flex";
      form_modal_container.style.display = "none"
    })
  }
};
cart.addEventListener("click", print_cart);

//FUNCUION PARA BORRAR ELEMENTOS
const delete_product = () => {
  const found_id = carrito.find((product) => product.id);
  carrito = carrito.filter((id) => {
    return id !== found_id;
  });
  quantity_cart_fun();
  local_storage();
  print_cart();
};
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

//FUNCION FORMULARIO
const Iniciar_compar = ()=> {
  cart_container.style.display = "none";
      form_modal_container.style.display = "flex";
      console.log("INicio OCmpra");
}