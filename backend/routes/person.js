import express from 'express';
import { signUp, login } from '../controllers/personController';
let personRouter = express.Router();

personRouter.post('/', signUp);
personRouter.get('/login', login);


export default personRouter;
