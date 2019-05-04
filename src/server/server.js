var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/files', function(req, res){
   console.log(req.body);
   res.send(req.body.id);
})

app.listen(3012, function(){
   console.log("Server started");
})
