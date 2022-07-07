const mongoose = require("mongoose");
const Part = require("../../model/parts");
const RawMaterial = require("../../model/raw_material");
const Toy = require("../../model/toy");

exports.newToy = (req, res) => {
    try {
      if (!req.body) {
        res.send('Invalid Request')
      }
      const toy = new Toy({
       Name:req.body.Name,
       Price:req.body.Price,
       Parts:req.body.Parts,
       RawMaterials:req.body.RawMaterials
      });
      toy.save().then((data) => {
          res.send(data)
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
function getPart(id) {
    Part.findOne({_id : id}).then((data)=>{
        return data
    }).catch((e)=>{console.log(e)})
}
const getRawMaterial = (id) =>{
    RawMaterial.find({_id : id}).then((data)=>{return data}).catch((e)=>{console.log(e)})
}
exports.getToy=(req,res)=>{
    try{
        let id=req.params.id;
        Toy.findOne({
            _id:id
        }).then((data)=>{
            res.send(data);
        }).catch((err)=>{
          res.status(500).send(err);
        })
    } catch (err) {
      res.status(500).send(err);
    }
};
exports.deleteToy=(req,res)=>{
    try{
        Toy.findByIdAndDelete({_id : req.params.id}).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).send(err)
        })
    } catch(err) {

    }
}
exports.UpdateToy=(req,res)=>{
    Toy.findByIdAndUpdate({_id : req.params.id},{
        Name:req.body.Name,
        Price:req.body.Price,
        Parts:req.body.Parts,
        RawMaterials:req.body.RawMaterials
    }).then((data)=>{
        res.send(data)
    })
}
