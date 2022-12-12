import Review from "../models/review.js";
import { validationResult } from "express-validator";

export function create(req, res) {
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else 
    Review.create({
      title: req.body.title,
      username: req.body.username,
      rating : req.body.rating,
      description: req.body.description,
      userId: req.body.userId,
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
  
export function getSupermarketReviews(req, res) {
    Review.find({supermarketId: req.body.supermarketId})
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
