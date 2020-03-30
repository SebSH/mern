import { Schema } from 'mongoose';

const messageSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
});

export default messageSchema;
