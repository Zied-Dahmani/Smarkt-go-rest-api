import Ticket from "../models/ticket.js";
import { updateWallet } from '../controllers/user.js';
import { validationResult } from "express-validator";

export function create(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Ticket.create({
    code: req.body.code,
    value: req.body.value,
    used: req.body.used
  })
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getAll(req, res) {
    Ticket.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function updateTicket(req, res) {
    Ticket.findOneAndUpdate({code:req.body.code},{used : true})
    .then((ticket) => {
        updateWallet(req.body.userId,req.body.wallet+ticket.value,res)
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    });
}