import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        provider: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        wallet: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);