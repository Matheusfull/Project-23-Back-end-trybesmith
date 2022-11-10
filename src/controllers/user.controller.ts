import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import IUser from '../interfaces/user.interface';

class UserController {
  constructor(private userService = new UserService()) { }

  createToken = (user: IUser) => {
    const tokencreate = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return tokencreate;
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);
    const token = this.createToken(userCreated);
    res.status(201).json({ token });
  };
}

export default UserController;