import { DataTypes } from 'sequelize'
import { connection } from '..'
import Work from './Work'

const Author = connection.define('authors', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
})

Author.belongsTo(Work, {
  foreignKey: 'work_id',
  as: 'work',
})

export default Author