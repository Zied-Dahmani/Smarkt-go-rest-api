import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const supermarketSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        location: {
            type: Number,
            required: true
        }
        
    },
    {
        timestamps: true
    }
);

export default model('Supermarket', supermarketSchema);