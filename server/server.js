const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


app.get("/api/customers", (req, res) => {
    const customers = [
        { name: "avi", age: 36, id: 1 },
        { name: "dani", age: 22, id: 2 },
        { name: "yossi", age: 29, id: 3 }
    ]
    res.send(customers);
})



app.listen(PORT, () => console.log("Server is up on port: " + PORT));
