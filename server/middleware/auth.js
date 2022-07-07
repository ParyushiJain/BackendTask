const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../model/user");


const userRegister = async (req, res, next) => {
  try {
    let usernameNotTaken = await validateUsername(req.body.Username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }
    const password = await bcrypt.hash(req.body.Password, 12);
    req.body["Password"] = password
    next()
  } catch (err) {
    console.log('Error')
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

const userLogin = async (req,res) => {
  let { Username, Password } = req.body;
  let user = await User.findOne({ Username : Username});
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  let isMatch = await bcrypt.compare(Password, user.Password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        Username: user.Username,
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      id : user._id,
      username: user.Username,
      token: `Bearer ${token}`,
      expiresIn: 168
    };
    return res.status(200).json({
      ...result,
      message: "Logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async (username) => {
    let user = await User.findOne({ Username : username });
    return user ? false : true;
};
const ChangePassword = async (req,res) => {
  let newPass = await bcrypt.hash(req.body.Password, 12)
  let user = await Seller.findOneAndUpdate({_id : req.params.id},{Password : newPass})
  return user ? res.status(200).send('Done') : res.status(401).send('Failed');
};

const Auth  = (req,res,next) => { 
  passport.authenticate("jwt", { session: false })(req,res,next) 
}

const serializeUser = req => {
  return {
    Username: req.user.username,
    _id: req.user._id,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
  }
}

const updateUser = async (user,req,res) => {
  const id = req.params.username;
  User.findOneAndUpdate({Username : id},user)
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Updated")
      }
  })
}

const deleteuser = async (req,res) => {
  const id = req.params.username;
  User.findOneAndDelete({Username : id})
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Deleted")
      }
  })
}

const GetUserData = async (req,res) => {
  User.findOne({Username: req.params.username})
  .then((data)=>{
    if(!data) {
      res.status(404).send("Failed")
    }
    else {
      res.status(200).send(data)
    }
  })
}

module.exports = {
  Auth,
  userLogin,
  userRegister,
  serializeUser,
  updateUser,
  GetUserData,
  deleteuser,
  ChangePassword
};