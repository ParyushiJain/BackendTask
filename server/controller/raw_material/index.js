const mongoose = require("mongoose");
const RawMaterial = require("../../model/raw_material");

exports.newRawMaterial = (req, res) => {
    try {
      if (!req.body) {
        res.send('Invalid Request')
      }
      const rawMaterial = new RawMaterial({
       Name:req.body.Name,
       Unit_Cost:req.body.Unit_Cost
  
      });
      rawMaterial.save().then((data) => {
          res.send(data)
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  exports.getRawMaterial=(req,res)=>{
    try{
        let id=req.params.rid;
        RawMaterial.find({
            _id:id
        }).then((data)=>{
            res.send(data)
        }).catch((err)=>{
          res.status(500).send(err);
        })
    } catch (err) {
      res.status(500).send(err);
    }
};