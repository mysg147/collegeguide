var express = require('express');
var path = require('path'); 
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var ejs = require('ejs');


								
var app = express();
app.set('view engine', 'ejs');
//enter the name of the database in the end 
var new_db = "mongodb://localhost:27017/database_name";				
								
													
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/lol.html');// index // remove return
	
}).listen(3000);

console.log("Server listening at : 3000");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

app.use('/view/static',express.static(__dirname+'/view/static'));

var getHash = (pass) => {
				
				var hmac = crypto.createHmac('sha512', pass);
				
				//passing the data to be hashed
				data = hmac.update(pass);
				//Creating the hmac in the required format
				gen_hmac= data.digest('hex');
				//Printing the output on the console
				console.log("hmac : " + gen_hmac);
				return gen_hmac;
}											

app.post('/sign_up' ,function(req,res){
	var name = req.body.name;
	var email= req.body.email;
	var pass = req.body.password;
		var phone = req.body.phone;
	var password = getHash( pass); 				

	
	var data = {
		"name":name,
		"email":email,
		"password": password, 
		"phone" : phone
	}
	
	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		var dbo=db.db("database_name");
		dbo.collection("details").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/log.html');  // remove return
//	 return res.redirect('/public/log.html');//addd this


});
app.post('/college' ,function(req,res){
	
	var email= req.body.email;
	//var password = req.body.password;
	var password = getHash( req.body.password); 			

	
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
			//console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/colsuccess.html');  

});

app.get('/search',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/search.html');
	
});
app.get('/contact',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/contact.html');
	
});

app.get('/home',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/lol.html');
	
});
app.post('/public/search_res',function(req,res){
	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
	var dbo = db.db("collegeinfo");
	var query = { name: req.body.search };
	dbo.collection("colldetails").find(query).toArray(function(err, result) {
	  if (err) throw err;
	  console.log(result);
	  res.render('search-result',{
	  	ad: result[0]
	  });
	  console.log(result);
	  db.close();
	});
	});
});

			///////////////////////////////////////////////////
								/*								
app.get('/login',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/log.html');// index // remove return
	
})//.listen(3000);// remove listen


app.post('/log_in' ,function(req,res){
	
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
		
			if(result.password==password)
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
	

});*/