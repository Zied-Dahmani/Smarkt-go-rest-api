import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import Item from "../models/item.js";

const orderSchema = new Schema(
    {
       supermarketName: {
            type: String,
            required: true
        },
        items: {
            type: Array(),
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Order', orderSchema);