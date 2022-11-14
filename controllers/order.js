import Order from "../models/order.js";
import { validationResult } from "express-validator";

export function create(req, res) {
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Order.create({
      supermarketName: req.body.name,
      items: req.body.items
    })
      .then(() => {
        res.status(201).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }



  