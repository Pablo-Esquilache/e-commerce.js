import { carrito, local_storage  } from "./print_cart.js";
import { quantityCart } from "./quantity_cart.js";

const fragment = document.createDocumentFragment();

export const listarCard = (product) => {
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
        quantityCart();
        local_storage();
      }
    });
  };