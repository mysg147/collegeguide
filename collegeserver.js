var express = require('express');
var path = require('path'); 
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
								
var app = express();
//enter the name of the database in the end 
var new_db = "mongodb://localhost:27017/collegeinfo";				
								
													
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/college.html');
}).listen(3002);

console.log("Server listening at : 3002");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

										

app.post('/college_save' ,function(req,res){
	var name = req.body.name;
	var course= req.body.course;
	var country = req.body.country;
	var subject = req.body.subject;
	
	
	var data = {
		"name":name,
		"course":course,
		"country": country, 
		"subject" : subject
	}
	
	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		var dbo=db.db("collegeinfo");
		dbo.collection("colldetails").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/colsuccess.html');  

});
			