import express from 'express';
import { add, getAll } from '../controllers/messageController';
let messageRouter = express.Router();

messageRouter.post('/message/add', add);
messageRouter.get('/message', getAll);

export default messageRouter;
