import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: false
        },
        wallet: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);