import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const orderSchema = new Schema(
    {
        group: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        isDelivered: {
            type: Boolean,
            required: true
        },
        dateTime: {
            type: Date,
            required: true
        },
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
          }]
    },
    {
        timestamps: true
    }
);

export default model('Order', orderSchema);