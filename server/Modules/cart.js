const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = process.env.DATABASEURL || "mongodb://localhost:27017/";
const ignoreWarning = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = "Book_Shelf";
const collectionName = "users";

function deleteAllDataFromCart(req, res) {
  let userId = req.params.userId;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(userId) };
    var newvalues = { $set: { myCart: [] } };
    dbo
      .collection(collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log("1 document updated");
        db.close();
      });
  });
}

function getCartData(req, res) {
  let id = req.params.userId;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    var dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .findOne({ _id: new ObjectID(id) }, function (err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.send(user.myCart);
        db.close();
      });
  });
}

function addToCart(req, res) {
  let id = req.body.id;
  let book = req.body.book;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(id) };
    var newvalues = { $push: { myCart: book } };
    dbo
      .collection(collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        res.send(result);
        console.log("1 document updated");
        db.close();
      });
  });
}

function deleteFromCart(req, res) {
  let userId = req.params.userId;
  let bookId = req.params.bookId;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      return res.sendStatus(500);
    }
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(userId) };
    var newvalues = { $pull: { myCart: { id: bookId } } };
    dbo
      .collection(collectionName)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          return res.sendStatus(500);
        }
        res.send(result);
        console.log("1 document deleted");
      });
  });
};

module.exports.deleteAllDataFromCart = deleteAllDataFromCart;
module.exports.getCartData = getCartData;
module.exports.addToCart = addToCart;
module.exports.deleteFromCart = deleteFromCart;
