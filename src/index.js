const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
//Agregar credenciales
mercadopago.configure({
  access_token:
    "APP_USR-8073014014129134-121712-ea866dc8dfc90112f4279e47d7c61262-1266563438",
});

app.use(cors({
  origin: "*",
}));
// Middleware
app.use(express.json());

//ROUTES
app.post("/checkout", (req, res) => {
  console.log(req.body);
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: req.body.unit_price,
        quantity: req.body.quantity,
      }
    ],
    back_urls: {
      success: "http://127.0.0.1:8080",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Entoy en http://localhost:${port}`);
});
