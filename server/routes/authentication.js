const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const DB_CONFIG = require('../config/db_config');



router.post('/login', (req, res) => {
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };
    const dbo = db.db(DB_CONFIG.dbName);

    //expect email , password
    const queryUser = req.body;

    dbo.collection(DB_CONFIG.collectionName).findOne(queryUser, function (err, user) {
      if (err) return res.sendStatus(500);


      if (user) {
        //don't return to user these values
        delete user.password;
        delete user.agreedEULA;

        //..this is post but no document is created so retrun 200
        return res.status(200).send(user);
      };

      //user not found
      return res.sendStatus(404);
    });
  });
});


router.post('/register', (req, res) => {
  MongoClient.connect(DB_CONFIG.url, DB_CONFIG.ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    };

    const dbo = db.db(DB_CONFIG.dbName);
    //expect email , password
    const queryUser = req.body;

    dbo
      .collection(DB_CONFIG.collectionName)
      .findOne({ email: queryUser.email }, function (err, userFound) {
        if (err) {
          return res.sendStatus(500);
        }

        if (userFound) {
          //..email found
          return res.sendStatus(400);
        }

        //no email matched => insert user
        dbo
          .collection(DB_CONFIG.collectionName)
          .insertOne(queryUser, function (err, result) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }
            res.sendStatus(201);
          });
      });
  });
});

module.exports = router;