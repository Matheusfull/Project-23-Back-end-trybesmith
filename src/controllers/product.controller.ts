import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    res.status(201).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const books = await this.productService.getAll();
    res.status(200).json(books);
  };
}

export default ProductController;

/*
Requisito 1
Na criação dessa classe, precisamos tipar tanto a req quanto a res. Lembre-se: em typescrip quando usarmos uma função, digo, método kkkk vamos tipar ou o parâmetro ou o retorno ou os dois.
1 - Só precisamos instanciar o service no controller  para ter acesso aos métodos
2 - Fazeremos a função normalmente de mandar os dados vindo do corpo da requisição e retornaremos o objeto vindo lá da model, que no caso é o id que o banco cadastrou e os dados colocados no corpo da requisição.
*/

/*
Requisito 2
Mesma coisa que foi comentada na camada service, chama e responde o que foi retornado do chamado
*/