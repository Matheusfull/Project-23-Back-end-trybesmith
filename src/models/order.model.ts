import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const result = await this.connection
      .execute(`SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds 
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON p.orderId = o.id
      GROUP BY o.id
      ORDER BY o.userId;`);
    const [rows] = result;
    return rows as IOrder[];
  }
}

/*
Requisito 4
Agora é tudo muito igual, portanto não adianta ficar comentado o que já foi comentado no requsito 1. Agora é só replicar e trocar a query.
*/