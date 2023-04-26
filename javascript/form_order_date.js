import { setOrder } from "../javascript/firebase.js";
import { form_order, compra } from "./form_order.js";


export const formOrderDate = () => {
    let name = form_order.querySelector("#name");
    let apellido = form_order.querySelector("#apellido");
    let localidad = form_order.querySelector("#location");
    let codigo_postal = form_order.querySelector("#code");
    let direccion = form_order.querySelector("#direction");
    let email = form_order.querySelector("#email");

    setOrder(
        name.value,
        apellido.value,
        localidad.value,
        codigo_postal.value,
        direccion.value,
        email.value,
        compra
      );
}