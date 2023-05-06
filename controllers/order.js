import Order from "../models/order.js";
import Item from "../models/item.js";
import User from "../models/user.js";
import Message from "../models/message.js";
import mongoose from 'mongoose';

import { validationResult } from "express-validator";


export function getMyOrders(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else{
    Order.find({isDelivered:true})
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }

}

export function get(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors: validationResult(req).array() })
  }
  else
  Order.find({})
    .then((docs) => {
      let order = null
      for (let i = 0; i < docs.length; i++) {
        if(docs[i].group.includes(req.user._id) && !docs[i].isDelivered)
        order = docs[i]
      }
      if(order)
      {
        res.status(200).json(order);
      }
      else
      {
        res.status(400).json({message : "Not found!"});
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    
}

export function addToCart(req, res) {
    if(!validationResult(req).isEmpty()){
      res.status(401).json({errors: validationResult(req).array() })
    }
    else
    Order.find({})
    .then((docs) => {
      let found = false;
      for (let i = 0; i < docs.length; i++) {
        let order = docs[i];
        if(order.group.includes(req.user._id) && !docs[i].isDelivered)
        {
            found = true;
            if(order.items[0].supermarketId == req.body.item.supermarketId)
            {
              let items = order.items
              items.push(req.body.item)
    
              Order.findOneAndUpdate({_id:order._id},{items : items})
              .then(() => {
                res.status(200).json(order);
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
            }
            else
            res.status(400).json(order);

        }
      }
      if(!found)
      {
        Order.create({
          group: Array(req.user._id), 
          items: Array(req.body.item),
          isDelivered: false,
          dateTime: new Date()
        })
        .then((order)=> {
          res.status(201).json(order);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      }
      

    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }

  export function removeItem(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    } else {
      Order.find({}).then((docs) => {
        for (let i = 0; i < docs.length; i++) {
          if (docs[i].group.includes(req.user._id) && !docs[i].isDelivered) {
            var newArray = docs[i].items
            newArray.splice(req.body.itemIndex,1)
            Order.findOneAndUpdate({ _id: docs[i]._id }, { items: newArray }).catch((err) => {
              console.error(err);
            });
          }
        }
  
        res.status(200).json(req.body);
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    }
  }

export function deleteOrder(req, res) {
  
    if(!validationResult(req).isEmpty()){
      res.status(400).json({errors: validationResult(req).array() })
    }
    else
    Order.find({})
    .then((docs) => {
      for (var i = 0; i < docs.length; i++) {
        if(docs[i].group.includes(req.user._id) && !docs[i].isDelivered)
        {
          for (var j = 0; j < docs[i].items.length; j++) {
            const item = docs[i].items[j];
            var sales = item.sales + item.quantity;
            Item.findOneAndUpdate({ _id: item._id }, { sales: sales  })
            .catch((err) => {
              console.error(err);
            });
          }
          Order.findOneAndUpdate({ _id: docs[i]._id }, { isDelivered: true })
          .then((order) => 
          {
            res.status(200).json(docs[i]);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });

       /*Order.deleteOne({_id: docs[i].id})
        .then((order) => 
        {
          res.status(200).json(docs[i]);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });*/
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });


}


export async function addUser(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({errors: validationResult(req).array()})
  } else {
    try {
      const order = await Order.findOne({ isDelivered: false })
      if (!order) {
        res.status(404).json({ error: "No  order found" })
        return
      }
      order.group.push(mongoose.Types.ObjectId(req.body.group))
      await order.save()
      res.status(200).json({})
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
}

export async function getNonMembers(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({errors: validationResult(req).array()})
    return
  }

  try {
    const order = await Order.findOne({ isDelivered: false })
    if (!order) {
      res.status(403).json({ error: "No order found" })
      return
    }

    const users = await User.find({})
    const orderGroupIds = order.group.map(id => id.toString())
    const usersNotInGroup = users.filter(user => !orderGroupIds.includes(user._id.toString()))
                      .map(user => ({ _id: user._id, fullName: user.fullName, image: user.image,provider: user.provider }));

    res.status(200).json(usersNotInGroup);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

export async function sendMessage(req, res) {
  const { senderId, content } = req.body;

  try {
    const order = await Order.findOne({ isDelivered: false });
    if (!order) {
      return res.status(404).json({ error: 'No active order found' });
    }

    const message = new Message({
      sender: senderId,
      order: order._id,
      content
    });

    await message.save();
    
    order.messages.push(message._id); 
    await order.save(); 

    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to send message' });
  }
}

export async function getMessages(req, res) {

  try {
    const order = await Order.findOne({ isDelivered: false });
    if (!order) {
      return res.status(404).json({ error: 'No active order found' });
    }
    const userId = mongoose.Types.ObjectId(req.body.userId);
    console.log("userid is "+userId)
    if (!order.group.includes(userId)) {
      return res.status(403).json({ error: 'User not authorized to access messages' });
    }
    const messages = await Message.find({ order: order })
      .populate('sender', 'fullName image provider')
      .sort({ createdAt: 'asc' })
      .select('content createdAt sender');

    const formattedMessages = messages.map(message => {
      return {
        provider: message.sender.provider,
        fullName: message.sender.fullName,
        image: message.sender.image,
        _id: message._id,
        content: message.content,
        createdAt: message.createdAt
      }
    });

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to get messages' });
  }
}










