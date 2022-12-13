const express = require("express");
const cors = require("cors");
const app = express();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const port = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client"));

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
        unit_price: parseInt(req.body.unit_price),
        quantity: req.body.quantity,
      },
    ],
    back_urls: {
			"success": "http://localhost:5500/index.html",
			"failure": "http://localhost:5500/index.html",
			"pending": "http://localhost:5500/index.html"
		},
		auto_return: "approved",
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

//SERVER
app.listen(port, () => {
  console.log(`Entoy en http://localhost:${port}`);
});
