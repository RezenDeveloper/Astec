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

const associate = () => {
  const Work = connection.models['works']

  Subject.hasMany(Work, {
    foreignKey: 'subject_id',
    as: 'works',
  })
}

export default {
  Model: Subject,
  associate
}