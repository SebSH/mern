import express from 'express';
import { add, getAll, get_player, update_player ,delete_player } from '../controllers/playerController';
let playerRouter = express.Router();

playerRouter.post('/player/add', add);
playerRouter.get('/player', getAll);
playerRouter.get('/player/:id', get_player );
playerRouter.put('/player/:id', update_player );
playerRouter.delete('/player/:id', delete_player );

export default playerRouter;
