import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
export default model('Message', messageSchema);