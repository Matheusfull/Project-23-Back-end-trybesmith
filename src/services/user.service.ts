import connection from '../models/connection';
import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create(user: IUser): Promise<IUser> {
    return this.model.create(user);
  }

  public getByUsernameService(username: string) {
    return this.model.getByUsername(username);
  }
}

export default UserService;

/*
Requisito 3
- Mesmo raciocínio da service de products
*/