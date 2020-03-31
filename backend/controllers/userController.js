import mongoose from 'mongoose';
import userSchema from '../models/userModel';

const User = mongoose.model('User', userSchema);

export const add = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, createdUser) => {
    if (err) {
      res.send(err);
    }

    res.json(createdUser);
  });
};

export const getAll = async (req, res) => {
  const users = await User.find().populate('messages');
  res.json(users);
};

exports.get_user = function (req, res) {
User.findOne({_id:req.params.id})
    .then(user => {
        if (!user) {
            res.status(404);
            return res.json({
                status: "404",
                message: "Could not find User."
            });
        } else {
          res.status(200);
          return res.json({
              status: "200",
              message: "User fetched successfully.",
              user: user
          });
        }
    })
    .catch(err => {
        res.status(500);
        return res.json({
            status: "500",
            message: "Something went wrong."
        });
    });
}

exports.update_user = function (req, res) {
User.findOne({_id:req.params.id})
    .then(user => {
      if (!user) {
          res.status(404);
          return res.json({
              status: "404",
              message: "User not found.",
              user: req.body
          });
      } else {
        User.updateOne(user, req.body, function(err, result) {
            if (err) {
                res.status(400);
                return res.json({
                    status: "400",
                    message: "Could not update User.",
                    user: req.body,
                });
              } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "User updated.",
                    userOld: user,
                    userNew: req.body
                });
              }
        });
      }
    })
    .catch(err => {
      res.status(500);
      return res.json({
          status: "500",
          message: "Something went wrong."
      });
    });
}

exports.delete_user = function (req, res) {
User.findOne({_id:req.params.id})
    .then(user => {
      if (!User) {
          res.status(404);
          return res.json({
              status: "404",
              message: "User not found."
          });
      } else {
    User.deleteOne({_id:req.params.id}, function(err, result){
        if (err) {
            res.status(400);
            return res.json({
                status: "400",
                message: "Could not delete User.",
                userId: req.params.id
            });
          } else {
            res.status(200);
            return res.json({
                status: "200",
                message: "User deleted.",
                userId: req.params.id
            });
          }
    });
  }
})
    .catch(err => {
      res.status(500);
      return res.json({
          status: "500",
          message: "Something went wrong."
      });
    });
};
