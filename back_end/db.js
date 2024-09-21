import Sequelize from "@sequelize/core";
import "dotenv/config";

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const db = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  dialect: "mysql",
  logging: false,
  // timezone: + "03:30"
});

try {
  await db.authenticate();
} catch (e) {
  console.log(e.message);
}
export default db;
