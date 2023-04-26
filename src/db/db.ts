// mysql2 => plus adapté pour ts
import mysql from "mysql2";
// pool => sécurité pour attraper les erreurs dans un t/c => reutilistion d'instance pour connexions séparées
import { Pool } from 'mysql2/promise';
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

class DbService {

  private client: Pool;

  constructor() {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'ElliahVD',
      password: '2204',
      database: 'my_library',
      port: 3306
    });

    this.client = pool.promise();

    this.client.on('connection', () => {
      console.log('Connected to MySQL database');
    });
  }

  async runQuery(query: string, values?: any): Promise<mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader> {
    const connection = await this.client.getConnection();

    const [rows] = await connection.execute(query, values);
    connection.release();
    return rows;
  }

  async disconnect(): Promise<void> {
    return this.client.end();
  }
}

export type MySqlReturnType = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export default { DbService }