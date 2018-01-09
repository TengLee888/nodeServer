require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;


//database 要用的參數
var collectionName = 'users'
var testData = {email: '123'}

// Use connect method to connect to the server
MongoClient.connect(url, function(err,client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);


  // mongo npm的範例
  // insertDocuments(db, function() {
  //   findDocuments(db, function() {
  //     client.close();
  //   });
  // });



  // //判斷信箱是否已註冊
  // db.collection(collectionName).findOne(testData, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   if(!result){
  //     console.log(" 此信箱尚未註冊");
  //     insertDocuments(db , function(){
  //       db.close();
  //     })
  //   }else{
  //     console.log(" 此信箱已註冊");
  //   }
  // });
});


// 輸入資料  Insert a Document
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Insert some documents
  // collection.insertMany([
  //   {a : 1}, {a : 2}, {a : 3}
  // ], function(err, result) {
  //   assert.equal(err, null);
  //   assert.equal(3, result.result.n);
  //   assert.equal(3, result.ops.length);
  //   console.log("Inserted 3 documents into the collection");
  //   callback(result);
  // });

  //我自己嘗試用insertOne, 尚未了解assert.equal，但成功
  collection.insertOne(
    testData,
    function(err, result) {
    // assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // assert.equal(3, result.ops.length);
    console.log("Inserted documents into the collection: " , testData);
    callback(result);
  });
}



// 搜尋篩選的資料 Find Documents with a Query Filter
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Find some documents
  collection.find(testData).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}



// 搜尋全部資料 Find All Documents
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection(collectionName);
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }
