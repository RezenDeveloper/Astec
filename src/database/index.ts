import { Dialect, Sequelize } from "sequelize";
import dbConfig from './config/database.js'

const { database, username, password, dialect, ...rest } = dbConfig

const connection = new Sequelize(database!, username!, password!, {
  dialect: dialect as Dialect,
  ...rest
})

export {
  connection
}