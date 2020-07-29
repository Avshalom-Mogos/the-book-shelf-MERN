module.exports.url = process.env.DATABASEURL || 'mongodb://localhost:27017/';
module.exports.ignoreWarning = { useNewUrlParser: true, useUnifiedTopology: true };
module.exports.dbName = 'Book_Shelf';
module.exports.collectionName = 'users';