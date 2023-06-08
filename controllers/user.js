import User from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import multerConfig from '../middlewares/multer-config.js';

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'jwt', {
        expiresIn: maxAge
    });
};




export const signUp = async (req, res) => {
  
  const userCount = (await User.countDocuments()) + 1

    const user = new User({provider: req.body.provider,id: req.body.id,fullName: req.body.fullName ?? "User"+userCount, image: req.body.image ?? "img/person.png", wallet: 0})
    user.save()
        .then(() => {
            const token = createToken(user._id);

            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
            res.header('jwt', token)
            res.status(201).json({
                token, ...user._doc
            });
        })
        .catch((err) => {
            res.status(400).json({error: err.message});
        })
}

export const signIn = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else{
    try {
        const user = await User.findOne({id: req.body.id});
        if (user) {
                const token = createToken(user._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
                res.header("jwt", token)
                res.status(200).json({
                    token, ...user._doc
                });
            
        } else {
            res.status(404).json({error: "No user found"})
        }
    } catch (err) {
        res.status(400).json({error: err.message})
    }
  }
}

export const signOut = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.header('jwt', '')
    res.status(200).send({"msg": "signed out"});
}

const upload = multerConfig('image', { fileSize: 100024 * 100024 * 5 });
export function updateProfilePicture(req, res) {
  upload(req, res, function (err) {
    if (err) {
      // Handle any errors from multer
      return res.status(500).json({ error: err.message });
    }
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    } else if (!req.file) {
      console.log(req.body);
    } else {

      User.findOneAndUpdate({ id: req.body.id }, {image : `img/${req.file.filename}`})
        .then((newUser) => {
          res.status(200).json(req.body);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
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


export function updateWallet(req,res) {
  const wallet = req.user.wallet
  User.findOneAndUpdate({_id:req.user._id},{wallet: wallet - req.body.total})
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getGroupMembers(req, res) {
    User.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        if(!docs[i].fullName=="" && req.body.group.includes(docs[i].id))
        list.push(docs[i]);
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getAllUsers(req, res) {
  User.find({})
  .then((docs) => {
    res.status(200).json(docs);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}


