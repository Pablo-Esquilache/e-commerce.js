const express = require('express');
const app = express();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-1372601663572352-120523-37adb67ea40c7652bfbf2ae3d38f25f0-257436529",
  });

//ROUTES
 app.get('/checkout', (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          title: "Mi producto",
          unit_price: 100,
          quantity: 1,
        },
      ],
    };
    
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      })
      .catch(function (error) {
        console.log(error);
      });
 })


//SERVER
app.listen(5500, opts)