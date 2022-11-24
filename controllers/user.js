import User from "../models/user.js";
import { validationResult } from "express-validator";


export function signUp(req, res) {

  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  User.create(req.body)
    .then((newUser) => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function signIn(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else
    User.findOne({ id: req.body.id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}


export function updateProfile(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  User.findOneAndUpdate({id:req.body.id},{fullName : req.body.fullName, wallet: req.body.wallet})
    .then((newUser) => {
      res.status(200).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function updateWallet(id,wallet,res) {
  
  User.findOneAndUpdate({id:id},{wallet: wallet})
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function get(req, res) {
    User.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        if(!docs[i].fullName=="" && !req.body.group.includes(docs[i].id))
        list.push(docs[i]);
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


