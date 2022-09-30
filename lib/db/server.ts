//Create a new DB connection with PG
import { Pool } from 'pg';

const Information = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});

export default Information;


