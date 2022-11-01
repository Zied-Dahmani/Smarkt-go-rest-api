import User from "../models/User.js";
import { validationResult } from "express-validator";



export function getAll(req, res) {
    User.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          username: docs[i].username,
          password: docs[i].password,
          wallet: docs[i].wallet,
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

/*

export function addOnce(req, res) {

  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Game.create({
    title: newGame.title,
    description: newGame.description,
    price: newGame.price,
    quantity: newGame.quantity,
    image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`
  })
    .then((newGame) => {
      res.status(200).json({newGame});
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}



export function getOnce(req, res) {
  Game.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then((doc1) => {
      Game.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}
    */
