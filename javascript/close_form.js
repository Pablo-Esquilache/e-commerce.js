import { cart_container } from "./print_cart.js";
import { form_modal_container } from "./form_order.js";

export const close = () => {
    cart_container.style.display = "none";
    form_modal_container.style.display = "none";
  }