
/**
 * Module dependencies.
 */

 // var express = require('express');
 var mongoose = require('mongoose');

 var feathers = require('feathers');
 var routes = require('./routes');
 var user = require('./routes/user');
 var http = require('http');
 var path = require('path');
 var selfService = require('./modules/Self-Service/lib');

 // Create Self-Service object
 var s = new selfService;

 // Connect to Mongo
var connection = mongoose.connect('mongodb://localhost/test');
/*var db = mongoose.connection();
db.on('open', function () {
  // now we can start talking
});*/

// Server
 var app = feathers();



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(feathers.favicon());
app.use(feathers.logger('dev'));
app.use(feathers.json());
app.use(feathers.urlencoded());
app.use(feathers.methodOverride());
app.use(app.router);
app.use('/bower_components',  feathers.static(__dirname + '/bower_components'));
app.use('/node_modules',  feathers.static(__dirname + '/node_modules'));
app.use(feathers.static(path.join(__dirname, 'public')));

/*app.configure(feathers.socketio(function(io) {
      
  io.on('connection', function(socket) {
      
    // Examples
    // - Emitting
    socket.emit('news', { hello: 'world' });
    // - Receiving
    socket.on('my other event', function (data) {
      console.log(data);
    });
    
        
  });       
        
  // Authentication
  io.set('authorization', function (handshakeData, callback) {
    // Authorize using the /users service
    app.lookup('/api/users').find({
      username: handshakeData.username,
      password: handshakeData.password
    }, callback);
  });
    
}));  */




// development only
if ('development' == app.get('env')) {
	app.use(feathers.errorHandler());
}
//------------------------------ Mongoose Models ---------------------------//
app.get('/', routes.index);
app.get('/users', user.list);

app.post('/signup', function(req, res) {

	var username = req.body.id;
	var password = req.body.pass;
	
	s.login({'username': username, 'password': password }, function(error, response, localService) {
		if (error != null){}
		else{

			localService.detailSchedule({ /*'startDate': new Date()*/ }, function(error, response, courses) {
				console.log("Completed!", courses);
				res.send(courses);
			});
			//res.send(courses)
			//res.redirect('/welcome.html');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('feathers server listening on port ' + app.get('port'));
});
