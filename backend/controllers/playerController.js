import mongoose from 'mongoose';
import playerSchema from '../models/playerModel';

const Player = mongoose.model('Player', playerSchema);

export const add = (req, res) => {
  let newPlayer = new Player(req.body);
  newPlayer.save((err, createdPlayer) => {
    if (err) {
      res.send(err);
    }

    res.json(createdPlayer);
  });
};

export const getAll = (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send(players);
  });
};

exports.get_player = function (req, res) {
  Player.findOne({_id:req.params.id})
         .then(player => {
              if (!player) {
                  res.status(404);
                  return res.json({
                      status: "404",
                      message: "Could not find player."
                  });
              } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "player fetched successfully.",
                    player: player
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

exports.update_player = function (req, res) {
  Player.findOne({_id:req.params.id})
         .then(player => {
            if (!player) {
                res.status(404);
                return res.json({
                    status: "404",
                    message: "player not found.",
                    player: req.body
                });
            } else {
              Player.updateOne(player, req.body, function(err, result) {
                  if (err) {
                      res.status(400);
                      return res.json({
                          status: "400",
                          message: "Could not update player.",
                          player: req.body,
                      });
                   } else {
                     res.status(200);
                     return res.json({
                         status: "200",
                         message: "player updated.",
                         playerOld: player,
                         playerNew: req.body
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

exports.delete_player = function (req, res) {
  Player.findOne({_id:req.params.id})
         .then(player => {
            if (!player) {
                res.status(404);
                return res.json({
                    status: "404",
                    message: "player not found."
                });
            } else {
              player.deleteOne({_id:req.params.id}, function(err, result){
                  if (err) {
                      res.status(400);
                      return res.json({
                          status: "400",
                          message: "Could not delete player.",
                          playerId: req.params.id
                      });
                   } else {
                     res.status(200);
                     return res.json({
                         status: "200",
                         message: "player deleted.",
                         playerId: req.params.id
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
