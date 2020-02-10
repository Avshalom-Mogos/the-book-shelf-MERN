const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const routerHelper = require("./routeHelper")
app.use(express.json());

app.post("/users/register", (req, res) => {
  routerHelper.register(req, res);
});

app.post("/users/login", (req, res) => {
  routerHelper.login(req, res);
});

//cart
app.get("/cart/:userId", (req, res) => {
  routerHelper.getCartData(req, res);
});

app.post("/cart", (req, res) => {
  routerHelper.addToCart(req, res);
});

app.delete("/cart/:userId/:bookId", (req, res) => {
  routerHelper.deleteFromCart(req, res);
})

//purchase history
app.get("/purchaseHistory/:userId", (req, res) => {
  routerHelper.getPurchaseHistoryData(req, res);
});

app.post("/purchaseHistory", (req, res) => {
  routerHelper.addToPurchaseHistory(req, res);
});


app.listen(PORT, () => console.log("Server is up on port: " + PORT));