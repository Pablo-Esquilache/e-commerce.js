const express = require("express");
//const cors = require('cors');
const body_parser = require("body-parser");

const app = express();
const port = 3000;

//REGION
// app.use(express.json({
//     type: "*/*"
// }))
// app.use(cors());

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Middleware
app.use(body_parser.urlencoded({ extended: true }));

// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-1372601663572352-120523-37adb67ea40c7652bfbf2ae3d38f25f0-257436529",
});

//ROUTES
app.post("/checkout", (req, res) => {
  console.log(req);
  //Crea un objeto de preferencia
  // let preference = {
  //   items: [
  //     {
  //       title: "Mi producto",
  //       unit_price: 100,
  //       quantity: 1,
  //     },
  //   ],
  // };
  // mercadopago.preferences
  //   .create(preference)
  //   .then(function (response) {
  //     res.redirect(response.body.init_point)
  //     // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
});

//  app.post('/checkout', (req, res) => {
//     res.send("estoy funcionando")
//  })

//SERVER
app.listen(port, () => {
  console.log(` Entoy en http://localhost:${port}`);
});
