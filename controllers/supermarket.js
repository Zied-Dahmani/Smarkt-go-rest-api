import Supermarket from "../models/supermarket.js";
import { validationResult } from "express-validator";
import {getDistance } from "geolib"

export function create(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Supermarket.create({
    name: req.body.name,
    //image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
    image: req.body.image,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location,
  })
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getAll(req, res) {
    Supermarket.find({})
    .then((docs) => {
      /*let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push(docs[i]);
      }*/
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getNearby(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else
    Supermarket.find({})
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
          let distance = getDistance(
            {
              latitude: docs[i].location[0],
              longitude: docs[i].location[1],
            },
            {
              latitude: req.body.currentLocation[0],
              longitude: req.body.currentLocation[1],
            }
          );
          if (distance / 1000 < 5) list.push(docs[i]);
        }
        res.status(200).json(list);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export function getCategories(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  {
    let list = ["Drinks","Fruits","Vegetables"];
    res.status(200).json(list);
  }

}

export function getFavorites(req, res) {
  Supermarket.find({})
  .then((docs) => {
    let list = [];
    for (let i = 0; i < docs.length; i++) {
      if(docs[i].favorites.includes(req.body.id))
      list.push(docs[i]);
    }
    res.status(200).json(list);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}

export function isFavorite(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else
    Supermarket.findOne({ _id: req.body.supermarketId })
      .then((doc) => {
        res.status(200).json(doc.favorites);        
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}
  
export function addRemoveFavorite(req, res) {
  
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else 
  Supermarket.findOneAndUpdate({_id:req.body.supermarketId},{favorites : req.body.favorites})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
