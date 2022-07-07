const Mongoose = require('mongoose')
const Parts= new Mongoose.Schema({
    _id:{
        type: Mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const RawMaterials = new Mongoose.Schema({
    _id:{
        type: Mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const ToyModel = new Mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    Parts:[Parts],
    RawMaterials:[RawMaterials]
},
{
    collection : 'Toys'
})
ToyModel.set('timestamps',true);
const Toy = Mongoose.model("Toys", ToyModel);

module.exports = Toy;