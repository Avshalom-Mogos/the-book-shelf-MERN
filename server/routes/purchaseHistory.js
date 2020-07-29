const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_CONFIG = require('../config/db_config');


router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) return res.status(500).send(`server problem - ${err}`);

    db.db(DB_CONFIG.dbName)
      .collection(DB_CONFIG.collectionName)
      .findOne({ _id: new ObjectID(userId) }, function (err, user) {
        if (err) return res.status(500).send(`server problem - ${err}`);
        res.send(user.purchaseHistory);
        db.close();
      });
  });
});


router.post('/', (req, res) => {

  const { id, items } = req.body;

  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) return res.status(500).send(`server problem - ${err}`);
    const dbo = db.db(DB_CONFIG.dbName);
    const myquery = { _id: new ObjectID(id) };
    const newValues = { $push: { purchaseHistory: { $each: items } } };
    dbo
      .collection(DB_CONFIG.collectionName)
      .updateOne(myquery, newValues, function (err, result) {
        if (err) return res.status(500).send(`server problem - ${err}`);

        res.send(result);
        console.log('1 document updated');
        db.close();
      });
  });
});

module.exports = router;