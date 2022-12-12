const express = require("express");
//const body_parser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Middleware
//app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());

// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-1372601663572352-120523-37adb67ea40c7652bfbf2ae3d38f25f0-257436529",
});

//ROUTES
app.post("/checkout", (req, res) => {
  console.log(req.body);
  //Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: req.body.unit_price,
        quantity: req.body.quantity,
      },
    ],
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point)
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

//  app.post('/checkout', (req, res) => {
//     res.send("estoy funcionando")
//  })

//SERVER
app.listen(port, () => {
  console.log(`Entoy en http://localhost:${port}`);
});
