import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public create(product: IProduct): Promise<IProduct> {
    return this.model.create(product);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }
}

export default ProductService;

/*
Requisito 1
1 - teremos como atributo o model e que será tipado conforme a classe ProductModel.
2 - No constructor não receberá parâmetros, porém, o atributo criado acima terá como valor a instanciação da classe ProductModel. Só que lembra lá da model ProductModel que no constructor recebe um parâmetro e que for instanciar essa classe deve passar esse valor ? Então, é aqui que entra esse parâmetro e ele será exatamente o arquivo connectio com as credenciais para o banco de dados. Ou seja, quando a gente passa esse valor, o método create tem acesso ao banco e pode fazer a SQL.
3 - Vamos criar o método create normalmente só para receber tudo que foi retornado na model. Porém, como estamos codando em typescript, vamos tipar o parâmetro e o retorno do método.
*/

/*
Requisito 2
Só fazer o padrão: método que usa um métoda da intanciação da model e retorna os dados do banco de dados.
obs: eu sei que pode ter ficado genérico, mas eu quis comentar assim para demonstrar que depois que cria a classe, não tem muito o que fazer com os métodos. só chamar e retornar o que veio nesse chamado.
- chamar: const products = await this.model.getAll();
- retornar o que veio nesse chamado: return products;
*/