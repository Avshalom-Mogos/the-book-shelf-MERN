const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const routerHelper = require("./routeHelper")
app.use(express.json());


// authentication

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


app.delete("/cart/:userId", (req, res) => {
  routerHelper.deleteAllDataFromCart(req, res)
})



//purchase history

app.get("/purchaseHistory/:userId", (req, res) => {
  routerHelper.getPurchaseHistoryData(req, res);
});

app.post("/purchaseHistory", (req, res) => {
  routerHelper.addToPurchaseHistory(req, res);
});

//deployment
if (process.env.NODE_ENV == "production") {
  const root = path.join(__dirname, "..", 'client', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })

}


app.listen(PORT, () => console.log("Server is up on port: " + PORT));