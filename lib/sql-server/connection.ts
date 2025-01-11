import sql from 'mssql';

const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export async function getSqlConnection() {
  try {
    const pool = await sql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.error('SQL Connection Error:', err);
    throw err;
  }
}