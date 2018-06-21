'use strict';

const mongoose = require('mongoose');

const legendarySchema = mongoose.Schema({
	classification: {type:String,required:true},
	name: {type:String,required:true},
	expansion: {type:String,required:true}
});

legendarySchema.methods.serialize = function() {

  return {
    id: this._id,
    classification: this.classification,
    name: this.name,
    expansion: this.expansion
  };
};


const LegendaryData = mongoose.model('legendarydata', legendarySchema);

module.exports = {LegendaryData};