import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

class BookService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public create(book: IProduct): Promise<IProduct> {
    return this.model.create(book);
  }
}

export default BookService;