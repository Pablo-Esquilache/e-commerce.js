const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

app.use(cors());

// Middleware
app.use(express.json());

mercadopago.configure({
  access_token:
    "APP_USR-1372601663572352-120523-40d45a9110c9926ae82a7e60d7c7d968-257436529",
  //"TEST-1372601663572352-120523-37adb67ea40c7652bfbf2ae3d38f25f0-257436529",
});

//ROUTES
app.get("/checkout", (req, res) => {
  res.send("Hola");
});

app.post("/checkout", (req, res) => {
  console.log(req.body);
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.unit_price),
        quantity: req.body.quantity,
      },
    ],
    back_urls: {
      success: "http://localhost:5500/index.html",
      failure: "http://localhost:5500/index.html",
      pending: "http://localhost:5500/index.html",
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
