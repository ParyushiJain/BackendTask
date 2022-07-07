const mongoose = require("mongoose");
const Part = require("../../model/parts");

exports.newPart = (req, res) => {
    try {
      if (!req.body) {
        res.send('Invalid Request')
      }
      const part = new Part({
       Name:req.body.Name,
       Unit_Cost:req.body.Unit_Cost
  
      });
      part.save().then((data) => {
          res.send(data)
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  exports.getPart=(req,res)=>{
      try{
          let id=req.params.pid;
          Part.find({
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