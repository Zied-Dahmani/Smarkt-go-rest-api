import Supermarket from "../models/supermarket.js";
import { validationResult } from "express-validator";


export function create(req, res) {

  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Supermarket.create({
    name: req.body.name,
    image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location,
  })
    .then((supermarket) => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getAll(req, res) {
    Supermarket.find({})
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
