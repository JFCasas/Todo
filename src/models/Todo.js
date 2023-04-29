var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var todoSchema = new Schema({

	title: {type:String, required:true},
	description: String
	
});


//Definimos el modelo

let Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;