import { DataTypes } from 'sequelize'
import { connection } from '..'

const Subject = connection.define('subjects', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
})

export default Subject