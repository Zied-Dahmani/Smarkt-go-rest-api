import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const supermarketSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        location: {
            type: Array,
            required: true
        },
        favorites: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Supermarket', supermarketSchema);