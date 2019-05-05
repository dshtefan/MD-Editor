var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Получение всей коллекции
app.post('/getfiles', function(req, res){
   db.collection('files').find({}).toArray(function(err, it){
      if (err){
         console.log(err);
         res.sendStatus(500);
         return;
      }
      res.send(it);
   })
});

//Сохранение файла
app.post('/savefile', function(req, res){
   var file = {
      name: req.body.name,
      text: req.body.text
   };
   db.collection('files').insertOne(file, function(err, result) {
      if (err){
         console.log(err);
         res.sendStatus(500);
         return;
      }
      res.send(file);
   })
});

//Обновление файла
app.post('/updatefile', function(req, res){
   var file = {
      $set: {
         name: req.body.name,
         text: req.body.text
      }
   };
   db.collection('files').updateOne({ _id: new mongodb.ObjectID(req.body.id)}, file);
   res.send({ upd: true });
});

//Удаление файла по id
app.post('/removefile', function(req, res){
   var id = {
      _id: new mongodb.ObjectID(req.body.id)
   }
   db.collection('files').deleteOne(id);
   res.sendStatus(200);
});

MongoClient.connect('mongodb://localhost:27017/lab5', function(err, database){
   if (err) {
      return console.log(err);
   }
   db = database.db('lab5');
   app.listen(3012, function(){
      console.log("Server started");
   });
})
