const mongoose = require('mongoose');

const legendarySchema = mongoose.Schema({
	classification: {type:String,required:true},
	name: {type:String,required:true},
	expansion: {type:String,required:true}
});

const LegendaryData = mongoose.model('legendarydata', legendarySchema);

module.exports = {LegendaryData};