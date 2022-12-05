import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ticketSchmea = new Schema(
    {
        code: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        used: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Ticket', ticketSchmea);