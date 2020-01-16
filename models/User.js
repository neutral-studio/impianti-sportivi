/*Importing Mongoose*/
const mongoose = require('mongoose');

/*Declaring "Schema" object*/
var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    cf: String,
    email: String,
    role: Number,
    office: Array
})

/*Declaring var User*/
var User = mongoose.model('User', schema);

/*Exporting var User*/
module.exports = User;

