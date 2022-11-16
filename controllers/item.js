import Item from "../models/item.js";
import { validationResult } from "express-validator";

export function create(req, res) {
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Item.create({
      name: req.body.name,
      //image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      supermarketId: req.body.supermarketId,
      supermarketName: req.body.supermarketName
    })
      .then(() => {
        res.status(201).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }


export function getAllBySupermarketIdAndCategory(req, res) {
    Item.find({category: req.body.category, supermarketId: req.body.supermarketId})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push(docs[i]);
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

  