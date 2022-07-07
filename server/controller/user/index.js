const mongoose = require("mongoose");
let User = require('../../model/user')
exports.newUser = async (req,res) =>{
    try {
        const user = new User({
            Username : req.body.Username,
            Password : req.body.Password,
            Name : req.body.Name
        })
        await user.save()
        res.status(200).send(user)
    } catch(err) {
        res.status(500).send(err)
    }
}

