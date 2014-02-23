
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var user = require('./routes/user');
 var http = require('http');
 var path = require('path');
 var selfService = require('./modules/Self-Service/lib');

 var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/signup', function(req, res) {

	var username = req.body.id;
	var password = req.body.pass;
	var s = new selfService;
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
	console.log('Express server listening on port ' + app.get('port'));
});
