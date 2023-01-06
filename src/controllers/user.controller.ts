import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../services/user.service';
// import IUser from '../interfaces/user.interface';

class UserController {
  constructor(private userService = new UserService()) { }

  createToken = (user: unknown) => {
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

  public getByUserNameController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (!password) return res.status(400).json({ message: '"password" is required' });

    const user = await this.userService.getByUsernameService(username);
    let data1: number | undefined | string = '';
    let data2 = '';
    console.log(user);
    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    data1 = user[0].id;
    data2 = user[0].username;
    const token = this.createToken({ data1, data2 });
    return res.status(200).json({ token });
  };
}

export default UserController;

/*
Requisito 3
A única coisa diferente que vamos fazer aqui é a criação do token, que no caso já está mais do que aprendida kkkk
1 - Quando o usuário for inserido no banco, vamos pegar os dados vindo da service, que no caso é um objeto com o id, username, classe, level e password.
2 - Depois vamos criar o token e para isso precisamos de três ingredientes: as informações do usuário, o segredo 🤫 e alguma especificações do token, tais como a validade dele e o tipo de algoritmo usado.
3 - Por fim só responder a esta requsição com o token gerado pela função criada no passo 2.
*/