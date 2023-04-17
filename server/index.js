const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token:
    "TEST-8073014014129134-121712-36573632deba2e84bcfc48685b365120-1266563438",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../index.html")));
app.use(cors());

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "index.html");
  res.sendFile(filePath);
});
app.get('/css/*.css', function(req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, '../', req.path));
  });
  

  app.get('/javascript/firebase.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, '../javascript/firebase.js'));
});

app.get('/javascript/script.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, '../javascript/script.js'));
  });

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:8080",
      failure: "http://localhost:8080",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(8080, () => {
  console.log("The server is now running on Port 8080");
});
