import { createConnection } from 'mysql2/promise';

export const initializeDatabase = async () => {
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS perfume_store`);
  await connection.end();
};
