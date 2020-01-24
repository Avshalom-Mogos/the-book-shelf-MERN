const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const routerHelper = require("./routeHelper")


app.post("/users/register", (req, res) => { 
  routerHelper.register(req,res);

});
    
app.post("/users/login", (req, res) => {
  routerHelper.login(req,res);

});

app.get("/cart/get", (req, res) => {
  routerHelper.getCartData(req,res);

});

app.post("/cart/add", (req, res) => {
  routerHelper.addToCart(req,res);

});



app.listen(PORT, () => console.log("Server is up on port: " + PORT));
