import express from 'express';
import { add, getAll, get_user, update_user ,delete_user } from '../controllers/userController';
let userRouter = express.Router();

userRouter.post('/user/add', add);
userRouter.get('/user', getAll);
userRouter.get('/user/:id', get_user );
userRouter.put('/user/:id', update_user );
userRouter.delete('/user/:id', delete_user );

export default userRouter;
