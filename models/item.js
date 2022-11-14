import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price:{
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        supermarketId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: false
        }
      
    },
    {
        timestamps: true
    }
);

export default model('Item', itemSchema);