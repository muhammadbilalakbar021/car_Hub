// JavaScript Document
const express = require('express');
const bodyParser = require('body-parser');
var fs=require('fs');
const app = express();
var http=require('http') 
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var result_Array=[];
app.use(express.json())

let courses=
[
    {id: 1, name:'Angular'},
    {id: 2, name:'PHP'},
    {id: 3, name:'ASP'}
]



var url = "mongodb://localhost:27017/cars_Db";

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())

app.post('/example', (req, res) => 
{
  MongoClient.connect(url, function(err, db) 
    {
      if (err) throw err;
      console.log("Database Selected !");
      var dbo=db.db("cars_Db");
      assert.equal(null, err);
      var collection=dbo.collection("Cars");
      // collection.insertOne({'car':a,'model':b});
      dbo.collection("Cars").find({'car':'Acura'}, function(err,result)
      {
        result.each(function(err,doc)
        {
          // assert.equal(null, err);
          result_Array.push(doc)
          console.log(doc);
        }, function(err , doc)
        {
          console.log("Printing Array")
          // res.render('back_End', {items: resultArray});
          db.close();
        });
        console.log("Printing Array")
        console.log(result_Array) 
        res.send({items:result_Array})
        
      });
    });
});


const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});
