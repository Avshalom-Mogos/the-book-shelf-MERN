const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "Book_Shelf"
collectionName = "users"


function login(req,res){
    console.log("/users/login")
MongoClient.connect(url, function(err, db) {
    if (err){
        console.log(err);
        return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    //expect email , password
     const queryUser = req.body;

    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
          console.log(err)
          return res.sendStatus(500);
      }
      
      if(user){
          //..this is post but no document is created so retrun 200
        return res.status(200).send(user);

      }

     //user not found
      return res.sendStatus(404);
    });
  });

}

///_______________register________________________________________________
function register(req,res){
    console.log("/users/register")

MongoClient.connect(url, function(err, db) {
  if (err) {
      console.log(err)
     return res.sendStatus(500);

  }

  const dbo = db.db(dbName);
  //expect email , password
  const queryUser = req.body;
  dbo.collection(collectionName).findOne({email:queryUser.email}, function(err, userFound)   {
    if (err) {
        return res.sendStatus(500);
    }
   if(userFound){
       //..email found
       return res.sendStatus(400)
   }
   
       //no email mathed => insert user
       dbo.collection(collectionName).insertOne(queryUser, function(err, result) {
        if (err) {
          console.log(err)
          return res.sendStatus(500);
        }
        res.sendStatus(201);

      });
    });

    
  });

}

module.exports.register=register ;
module.exports.login=login;