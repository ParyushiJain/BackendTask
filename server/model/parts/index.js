const Mongoose = require('mongoose')
const PartModel = new Mongoose.Schema({
    Name : {
        type : String
    },
    Unit_Cost : {
        type : Number
    }
},
{
    collection : 'Parts'
})
PartModel.set('timestamps',true);
const Part = Mongoose.model("Parts", PartModel);

module.exports = Part;