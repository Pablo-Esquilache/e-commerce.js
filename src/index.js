const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
//Agregar credenciales
mercadopago.configure({
  access_token:
    "APP_USR-8073014014129134-121712-ea866dc8dfc90112f4279e47d7c61262-1266563438",
});
//CORS
app.use(cors());

// Middleware
app.use(express.json());

//ROUTES
app.use("/", express.static("front"));

app.get("/prueba", (req, res) => {
  res.send("HOLAAA");
});

app.post("/checkout", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: req.body.unit_price,
        quantity: req.body.quantity,
      },
    ],
    back_urls: {
      success: "http://localhost:3000",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Entoy en http://localhost:${port}`);
});
