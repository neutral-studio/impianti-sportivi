/*Importing Mongoose*/
const mongoose = require('mongoose');

/*Declaring "Schema" object*/
var schema = new mongoose.Schema({
    name: String,
    address: String,
    sports: Array,
    activities: Array,
    contact: String
});

/*Declaring var Group*/
var Group = mongoose.model('Group', schema);

/*Exporting var Group*/
module.exports = Group;