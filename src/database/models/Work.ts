import { DataTypes } from 'sequelize'
import { connection } from '../index'

const Work = connection.define('works', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  year: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
})

const associate = () => {
  const Subject = connection.models['subjects']
  
  Work.belongsTo(Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
  })
}

export default {
  Model: Work,
  associate
}