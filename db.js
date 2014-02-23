var mongoose = require( 'mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
	name: String,
	A#: String,
	hash: String
	courses: Array
})

mongoose.model('User', User);
mongoose.connect('mongodb://localhost/')