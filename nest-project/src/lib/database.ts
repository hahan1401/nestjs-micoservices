import { createConnection } from 'mysql2/promise';

export const initializeDatabase = async () => {
  const connection = await createConnection({
    // host: 'localhost',
    host: '172.31.53.108',
    port: 3306,
    user: 'root',
    password: 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS perfume_store`);
  await connection.end();
};
