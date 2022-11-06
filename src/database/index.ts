import { Dialect, Sequelize } from "sequelize";
import dbConfig from './config/database.js'
import mysql2 from "mysql2";

const { database, username, password, dialect, ...rest } = dbConfig

const connection = new Sequelize(database!, username!, password!, {
  dialect: dialect as Dialect,
  dialectModule: mysql2,
  ...rest
})

export {
  connection
}