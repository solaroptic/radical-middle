import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.HOST_NAME,
  user: process.env.USER,
  password: process.env.AZURE_PASS,
  database: process.env.AZURE_DB,
  port: process.env.AZURE_PORT,
  idleTimeout: 30000,
  // ssl: { ca: fs.readFileSync("{ca-cert filename}") },
});

export const db = pool;
// import mysql from "mysql2/promise";

// export const db = await mysql.createConnection({
//   host: process.env.HOST_NAME,
//   user: process.env.USER,
//   password: process.env.AZURE_PASS,
//   database: process.env.AZURE_DB,
//   port: process.env.AZURE_PORT,
// });
// ssl: { ca: fs.readFileSync("{ca-cert filename}") },
// export const db = await mysql.createConnection({
//   host: "solar-server.mysql.database.azure.com",
//   user: "solaroptic",
//   password: "12angryrabbits!",
//   database: "blog",
// });
