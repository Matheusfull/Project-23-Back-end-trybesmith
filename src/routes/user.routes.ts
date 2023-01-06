import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const usercontroller = new UserController();

router.post('/users', usercontroller.create);
router.post('/login', usercontroller.getByUserNameController);

export default router;