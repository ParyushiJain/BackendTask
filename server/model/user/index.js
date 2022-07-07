const Mongoose = require('mongoose')

const UserModel = new Mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
},
{
    collection : 'Users'
})
UserModel.set('timestamps',true);
const User = Mongoose.model("Users", UserModel);

module.exports = User;