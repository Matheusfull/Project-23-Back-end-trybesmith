import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}

/*
Requisito 1
Como é o primeiro usando TypeScript, vamos criar um model com uma classe e não função, como era de costume.
1 - Vamos criar o atributo connection que será do tipo Pool
2 - No constructor, vamos receber como parâmetro 'algo' do tipo Pool e além disso, o atributo terá o valor do que foi passado no parâmetro.
3 - Teremos então o método create, responsável por fazer a comunicação com o banco de dados para implementar um dado. Como estamos lidando com TypeScript, precisamos tipar o que a função vai receber e o que ela vai retornar. Para  isso, vamos destrinchar, mas claro: com a linguagem das ruas
  1 - Essa função vai receber como parâmetro algo que tenha o molde de IProduct, que será um 'objeto' ande já tipou cada chave.
  2 - O retorno dessa função será uma promise também ao molde de IProduct.
  3 - Vamos pegas as informações e colocar no banco, porém, para isso, lembra daquele atributo que criamos ? Agora que ele entra em cena, pois ele permite essa conexão por ter o tipo Pool.
  obs: Esse atributo, connection, terá o valor que for passado no parâmetro do constructor. E esse valor será passado por quem implementar a classe ProductModel. Ou seja, o server tem por obrigação passar um parâmetro para a classe ProductModel.
  4 - Vamos herdar o tipo ResultSetHeader que é quando realizamos queries insert.
  5 - Depois basta fazer a SQL normal, inserindo os dados.
  6 - Por fim, vamos desconstruir os dados até ter o id que foi gerado pelo banco e retornar um objeto com o id e os dados enviados.
*/

/*
Requisito 2
Nós ja temos a classe montada, agora basta só criar os métodos para cada requisito. É muito importante saber como a classe funciona, pois, uma vez implementado os atributos e constructor, o restante ( os métodos ) serão só 'funções' bem específicas. Vamos então ao getAll.
1 - Esse método retornará uma promise que será um array e cada índice terá o mesmo modelo da interface IProduct. Ou seja, cada indice será um objeto com as chaves id, name, amount e orderId.
2 - Depois vamos fazer a consulta ao banco, porém esse resultado será retornado, portanto, colocaremos isso tudo numa variável. Usaremos o await, porque ele espera uma promise, e o atributo connection que fará a conexão com o banco de dados. Esse atributo reecebrá como valor o que for passado para ele na camada service, que no caso é o arquivo com as variáveis de ambiente com as credenciais no banco. Percebe que está tudo interligado, uma coisa puxando a outra ? Vou tentar ilustrar melhor:

espera os dados virem --> usa o connection.execute --> o connection vem do atributo da classe ProductModel --> tem como valor o que é passado no constructor --> esse valor é gerado por quem for instanciar essa classe --> quem instancia essa classe é a camada service --> a service passa como valor o arquivo connection --> nele há o acesso ao banco de dados.

3 - Fazemos a SQL
4 - Desconstruiremos o que vem como resposta do banco de dados, a fim de retornarmos algo mais específico.
*/