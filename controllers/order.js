import Order from "../models/order.js";
import { validationResult } from "express-validator";



export function get(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else
  Order.find({})
    .then((docs) => {
      let order = null
      for (let i = 0; i < docs.length; i++) {
        if(docs[i].group.includes(req.body.id))
        order = docs[i]
      }
      if(order)
      res.status(200).json(order);
      else
      res.status(400).json({message : "Not found!"});
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
    Order.find({})
    .then((docs) => {
      let found = false;
      for (let i = 0; i < docs.length; i++) {
        let order = docs[i];
        if(order.group.includes(req.body.userId))
        {
            found = true;
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
      }
      if(!found)
      Order.create({
        group: Array(req.body.userId), 
        items: req.body.items
      })
      .then(()=> {
        res.status(201).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });

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
    Order.findOneAndUpdate({group:req.body.group},{items : req.body.items})
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
    Order.find({})
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        if(docs[i].group.includes(req.body.id))
        Order.deleteOne({_id: docs[i].id})
        .then((order) => 
        {  
          res.status(200).json(order);
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


export function addUser(req, res) {
  
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Order.find({})
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        if(docs[i].group.includes(req.body.userId))
        {
          Order.findOneAndUpdate({_id:docs[i]._id},{group: req.body.group})
          .then(() => 
          { 
            res.status(200).json({});
          })
          .catch((err) => {


          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}