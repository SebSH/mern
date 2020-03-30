import { Schema } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },

});

export default userSchema;
