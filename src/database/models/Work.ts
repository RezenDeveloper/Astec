import { DataTypes } from 'sequelize'
import { connection } from '../index'
import Subject from './Subject'

const Work = connection.define('work', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  year: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
})

Work.belongsTo(Subject, {
  foreignKey: 'subject_id',
  as: 'subject',
})


export default Work