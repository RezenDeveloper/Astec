import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { connection } from '..'

interface SubjectModel extends Model<InferAttributes<SubjectModel>, InferCreationAttributes<SubjectModel>> {
  id: CreationOptional<string>
  name: string
  description: string
}

const Subject = connection.define<SubjectModel>('subjects', {
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