const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_CONFIG = require('../config/db_config');



router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;

  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) throw err;
    const dbo = db.db(DB_CONFIG.dbName);
    const myquery = { _id: new ObjectID(userId) };
    const newvalues = { $set: { myCart: [] } };
    dbo
      .collection(DB_CONFIG.collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log('1 document updated');
        db.close();
      });
  });
});


router.get('/:userId', (req, res) => {
  const id = req.params.userId;
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };

    db.db(DB_CONFIG.dbName)
      .collection(DB_CONFIG.collectionName)
      .findOne({ _id: new ObjectID(id) }, function (err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.send(user.myCart);
        db.close();
      });
  });
});


router.post('/', (req, res) => {
  const { id, book } = req.body;
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    var dbo = db.db(DB_CONFIG.dbName);
    var myquery = { _id: new ObjectID(id) };
    var newvalues = { $push: { myCart: book } };
    dbo
      .collection(DB_CONFIG.collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        res.send(result);
        console.log('1 document updated');
        db.close();
      });
  });
});


router.delete('/:userId/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) {
      return res.sendStatus(500);
    };
    const dbo = db.db(DB_CONFIG.dbName);
    const myquery = { _id: new ObjectID(userId) };
    const newvalues = { $pull: { myCart: { id: bookId } } };
    dbo
      .collection(DB_CONFIG.collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          return res.sendStatus(500);
        };
        res.send(result);
        console.log('1 document deleted');
      });
  });
});

module.exports = router;