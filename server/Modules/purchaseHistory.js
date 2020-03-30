const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = process.env.DATABASEURL || "mongodb://localhost:27017/";
const ignoreWarning = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = "Book_Shelf";
const collectionName = "users";

function getPurchaseHistoryData(req, res) {
  let userId = req.params.userId;
  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .findOne({ _id: new ObjectID(userId) }, function (err, user) {
        if (err) throw err;
        res.send(user.purchaseHistory);
        db.close();
      });
  });
}

function addToPurchaseHistory(req, res) {
  let userId = req.body.id;
  let items = req.body.items;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(userId) };
    var newvalues = { $push: { purchaseHistory: { $each: items } } };
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

module.exports.getPurchaseHistoryData = getPurchaseHistoryData;
module.exports.addToPurchaseHistory = addToPurchaseHistory;
