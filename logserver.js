var express = require('express');
var path = require('path'); 
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
								
var app = express();
//enter the name of the database in the end 
var new_db = "mongodb://localhost:27017/loginsever";				
								
													
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/log.html');
}).listen(3001);

console.log("Server listening at : 3001");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

										

app.post('/college' ,function(req,res){
	
	var email= req.body.email;
	var password = req.body.password;
				

	
	var data = {
	
		"email":email,
		"password": password
	}
	
	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		var dbo=db.db("database_name");
		
		dbo.collection("details").findOne({'email':email,'password':password},function(err,result)
	{
		if(err)throw err;
		
		
		if(result!=null)
		{
			console.log("yep");
		
		//	if(result.password==password)
			return res.redirect('/public/college.html');
		//	else
			
		}
		else
		res.send('password incorrect' );  
	});
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	
	});
	

});
			