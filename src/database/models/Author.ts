import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { connection } from '..'

interface AuthorModel extends Model<InferAttributes<AuthorModel>, InferCreationAttributes<AuthorModel>> {
  id: CreationOptional<string>
  name: string
  work_id?: string
}

const Author = connection.define<AuthorModel>('authors', {
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