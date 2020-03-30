import mongoose from 'mongoose';
import messageSchema from '../models/messageModel';
import userSchema from '../models/playerModel';

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

export const add = async (req, res) => {
  let user = await User.findOne({ userName: req.body.userName });

  if (!user) {
    user = new User({ userName: req.body.userName});
  }

  var message = new Message({ msg: req.body.msg});
  await message.save();

  user.messages.push(message);
  user = await user.save();

  res.send(user);
};

export const getAll = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      res.send('an error occured while trying to get messages');
    }

    res.send(messages);
  });
};
