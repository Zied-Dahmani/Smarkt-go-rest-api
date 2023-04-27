import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: false
        },
        description: {
            type: String
        },
        rating: {
            type: Number,
            required: true
        },
        supermarketId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        supermarketName: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default model('Review', reviewSchema);