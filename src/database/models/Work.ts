import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { connection } from '../index'

export interface WorkModel extends Model<InferAttributes<WorkModel>, InferCreationAttributes<WorkModel>> {
  id: CreationOptional<string>
  subject_id?: string
  year: number
  title: string
  description: string
  pdf_id: string
}

const Work = connection.define<WorkModel>('works', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  year: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  pdf_id: DataTypes.STRING
})

const associate = () => {
  const Subject = connection.models['subjects']
  const Tag = connection.models['tags']
  const Author = connection.models['authors']

  Work.belongsTo(Subject, {
    foreignKey: 'subject_id',
    as: 'subject',
  })
  Work.belongsToMany(Tag, {
    foreignKey: 'work_id',
    through: 'work_tags',
    as: 'tags'
  })
  Work.hasMany(Author, {
    foreignKey: 'work_id',
    as: 'authors',
  })
}

export default {
  Model: Work,
  associate
}