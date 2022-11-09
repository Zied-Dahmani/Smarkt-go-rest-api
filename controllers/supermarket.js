import Supermarket from "../models/supermarket.js";
import { validationResult } from "express-validator";


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
