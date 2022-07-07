const Mongoose = require('mongoose')
const RawMaterialModel = new Mongoose.Schema({
    Name : {
        type : String
    },
    Unit_Cost : {
        type : Number
    }
},
{
    collection : 'RawMaterials'
})
RawMaterialModel.set('timestamps',true);
const RawMaterial = Mongoose.model("RawMaterials", RawMaterialModel);

module.exports = RawMaterial;