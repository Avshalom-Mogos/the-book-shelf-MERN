const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = process.env.DATABASEURL || "mongodb://localhost:27017/";
const ignoreWarning = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = "Book_Shelf";
const collectionName = "users";

function login(req, res) {
  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    //expect email , password
    const queryUser = req.body;

    dbo.collection(collectionName).findOne(queryUser, function (err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (user) {
        //don't return to user these values
        delete user.password;
        delete user.agreedEULA;

        //..this is post but no document is created so retrun 200
        return res.status(200).send(user);
      }

      //user not found
      return res.sendStatus(404);
    });
  });
}



// ____________register________________________________________________
function register(req, res) {
  console.log("/users/register");

  MongoClient.connect(url, ignoreWarning, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(dbName);
    //expect email , password
    const queryUser = req.body;

    dbo
      .collection(collectionName)
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
          .collection(collectionName)
          .insertOne(queryUser, function (err, result) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }
            res.sendStatus(201);
          });
      });
  });
}

module.exports.register = register;
module.exports.login = login;
