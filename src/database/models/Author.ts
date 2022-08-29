import { DataTypes } from 'sequelize'
import { connection } from '..'

const Author = connection.define('authors', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
})

const associate = () => {
  const Work = connection.models['works']
  
  Author.belongsTo(Work, {
    foreignKey: 'work_id',
    as: 'work',
  })
}

export default {
  Model: Author,
  associate 
}