import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        userId: {
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