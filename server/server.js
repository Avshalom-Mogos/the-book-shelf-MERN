const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const authenticationRouter = require('./routes/authentication');
const purchaseHistoryRouter = require('./routes/purchaseHistory');
const cartRouter = require('./routes/cart');
app.use(express.json());


//routes
app.use('/users', authenticationRouter);
app.use('/cart', cartRouter);
app.use('/purchaseHistory', purchaseHistoryRouter);


//deployment
if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
};

app.listen(PORT, () => console.log('Server is up on port: ' + PORT));