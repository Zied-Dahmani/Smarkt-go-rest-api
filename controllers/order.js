import Order from "../models/order.js";
import { validationResult } from "express-validator";



export function get(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Order.findOne({userId: req.body.id})
  .then((docs) => {
    res.status(200).json(docs);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}

export function add(req, res) {
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Order.findOne({userId: req.body.userId})
      .then((order) => {

        if(order)
        {
            if(order.items[0].supermarketId == req.body.items[0].supermarketId)
            {
              let items = order.items
              items.push(req.body.items[0])
    
              Order.findOneAndUpdate({_id:order._id},{items : items})
              .then((order) => {
                res.status(200).json(req.body);
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
            }
            else
            res.status(400).json(order);

        }
        else{

          Order.create({
            userId:req.body.userId, 
            items: req.body.items,
            quantities: req.body.quantities
          })
          .then(()=> {
            res.status(201).json(req.body);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });

        }


      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function removeItem(req, res) {
  
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Order.findOneAndUpdate({userId:req.body.userId},{items : req.body.items})
      .then(() => {
        res.status(200).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function deleteOrder(req, res) {
  
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Order.deleteOne({userId: req.body.id})
    .then((order) => 
    {  
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }