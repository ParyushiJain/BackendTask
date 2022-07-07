const express = require("express");
const router = express.Router();
const Part = require('../controller/parts')
const RawMaterial = require('../controller/raw_material')
const Toy=require('../controller/toy')
const Auth = require('../middleware/auth')
const User = require('../controller/user')

router.post("/api/create/part",Part.newPart);
router.post("/api/create/rawMaterial",RawMaterial.newRawMaterial);
router.post("/api/create/toy",Toy.newToy);
router.get("/api/get/toy/:id",Toy.getToy);
router.put("/api/updateToy/:id",Toy.UpdateToy);
router.delete("/api/deleteToy/:id",Toy.deleteToy);
router.post("/api/create/user",Auth.userRegister,User.newUser)
router.post("/api/loginUser",Auth.userLogin); 
module.exports = router;
