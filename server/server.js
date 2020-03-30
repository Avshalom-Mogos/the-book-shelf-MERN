const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const authentication = require("./modules/authentication");
const purchaseHistory = require("./modules/purchaseHistory");
const cart = require("./modules/cart");
app.use(express.json());


// authentication
app.post("/users/register", (req, res) => {
  authentication.register(req, res);
});

app.post("/users/login", (req, res) => {
  authentication.login(req, res);
});


//cart
app.get("/cart/:userId", (req, res) => {
  cart.getCartData(req, res);
});

app.post("/cart", (req, res) => {
  cart.addToCart(req, res);
});

app.delete("/cart/:userId/:bookId", (req, res) => {
  cart.deleteFromCart(req, res);
});

app.delete("/cart/:userId", (req, res) => {
  cart.deleteAllDataFromCart(req, res);
});


//purchase history
app.get("/purchaseHistory/:userId", (req, res) => {
  purchaseHistory.getPurchaseHistoryData(req, res);
});

app.post("/purchaseHistory", (req, res) => {
  purchaseHistory.addToPurchaseHistory(req, res);
});

//deployment
if (process.env.NODE_ENV == "production") {
  const root = path.join(__dirname, "..", "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
};

app.listen(PORT, () => console.log("Server is up on port: " + PORT));
