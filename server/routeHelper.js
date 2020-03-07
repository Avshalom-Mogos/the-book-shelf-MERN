const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb+srv://Avshalomogos:Aa123456@bookshelfcluster-ys4qh.mongodb.net/test?retryWrites=true&w=majority";
const ignoreWarning = { useNewUrlParser: true, useUnifiedTopology: true };

const dbName = "Book_Shelf"
const collectionName = "users"




function login(req, res) {
  console.log("/users/login")
  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    //expect email , password
    const queryUser = req.body;
    // console.log(queryUser)

    dbo.collection(collectionName).findOne(queryUser, function (err, user) {
      if (err) {
        console.log(err)
        return res.sendStatus(500);
      }

      if (user) {
        //..this is post but no document is created so retrun 200
        return res.status(200).send(user);

      }

      //user not found
      return res.sendStatus(404);
    });
  });

}

///_______________register________________________________________________
function register(req, res) {
  console.log("/users/register")

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err)
      return res.sendStatus(500);

    }

    const dbo = db.db(dbName);
    //expect email , password
    const queryUser = req.body;
    //console.log(queryUser);

    dbo.collection(collectionName).findOne({ email: queryUser.email }, function (err, userFound) {
      if (err) {
        return res.sendStatus(500);
      }
      if (userFound) {
        //..email found
        console.log("#######");

        return res.sendStatus(400)
      }

      //no email mathed => insert user
      dbo.collection(collectionName).insertOne(queryUser, function (err, result) {
        if (err) {
          console.log(err)
          return res.sendStatus(500);
        }
        res.sendStatus(201);

      });
    });


  });

}

//refactor find user (DO THIS LATER)

function getCartData(req, res) {

  let id = req.params.userId;

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err)
      return res.sendStatus(500);
    }

    var dbo = db.db(dbName);
    dbo.collection(collectionName).findOne({ _id: new ObjectID(id) }, function (err, user) {
      if (err) {
        console.log(err)
        return res.sendStatus(500);
      }
      res.send(user.myCart)
      db.close();
    });
  });
}

function addToCart(req, res) {
  let id = req.body.id;
  let book = req.body.book;
  console.log(id);
  console.log(book);

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(id) };
    var newvalues = { $push: { myCart: book } };
    dbo.collection(collectionName).updateOne(myquery, newvalues, function (err, result) {
      if (err) {
        console.log(err)
        res.sendStatus(500);
      }
      res.send(result)
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
    dbo.collection(collectionName).updateOne(myquery, newvalues, function (err, result) {
      if (err) {
        return res.sendStatus(500);
      }
      res.send(result)
      console.log("1 document deleted!!!");

    });
  });
}

//Purchase History

function getPurchaseHistoryData(req, res) {

  let userId = req.params.userId;
  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection(collectionName).findOne({ _id: new ObjectID(userId) }, function (err, user) {
      if (err) throw err;
      res.send(user.purchaseHistory)
      db.close();
    });
  });
}

function addToPurchaseHistory(req, res) {

  let userId = req.body.id;
  let items = req.body.items;

  console.log("######################");
  console.log(userId);
  console.log(items);
  console.log("######################");

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(userId) };
    var newvalues = { $push: { purchaseHistory: { $each: items } } };
    dbo.collection(collectionName).updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      res.send(result)
      console.log("1 document updated");
      db.close();
    });
  });
}


function deleteAllDataFromCart(req, res) {

  let userId = req.params.userId;
  console.log(userId);

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { _id: new ObjectID(userId) };
    var newvalues = { $set: { myCart: [] } };
    dbo.collection(collectionName).updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      res.send(result)
      console.log("1 document updated12");
      db.close();
    });
  });

}



module.exports.deleteAllDataFromCart = deleteAllDataFromCart;
module.exports.register = register;
module.exports.login = login;
module.exports.getCartData = getCartData;
module.exports.addToCart = addToCart;
module.exports.deleteFromCart = deleteFromCart;
module.exports.getPurchaseHistoryData = getPurchaseHistoryData;
module.exports.addToPurchaseHistory = addToPurchaseHistory;