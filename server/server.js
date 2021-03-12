var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the db
var mongoose = require('mongoose').set('debug',true);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/loginDb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
     console.log("DB Connected");  
});
//Define a schema
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
  First_Name: String,
  Last_Name: String,
  Is_Admin: Boolean,
  Password: String
});

var userDetailsModel = mongoose.model("userdetail", userDetailsSchema );


app.get('/', function (req, res) {
       userDetailsModel.find(function(err,data){
        if(err){
            console.log("error in finding users");
        }else{
            console.log("user exists with name ", data);
            res.send(data);
        }
    });
  
});

app.post('/saveLoginData', function (req, res) {
    var user = new userDetailsModel( {
        First_Name : req.body.firstname ,
        Last_Name : req.body.lastname,
        Is_Admin : false,
        Password : req.body.password
    });
    user.save(function(err,data){
        if(err){
            console.log("error in finding users");
        }else{
            console.log("user exists with name ", data);
            res.send(data);
        }
    });
  
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});