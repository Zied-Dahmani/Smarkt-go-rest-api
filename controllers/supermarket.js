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

export function getNearest(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else
    Supermarket.find({})
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
          let distance = getDistance(
            {
              latitude: docs[i].location.coordinates[0],
              longitude: docs[i].location.coordinates[1],
            },
            {
              latitude: req.body.coordinates[0],
              longitude: req.body.coordinates[1],
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
  
