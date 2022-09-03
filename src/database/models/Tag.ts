import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { connection } from '..'

interface TagModel extends Model<InferAttributes<TagModel>, InferCreationAttributes<TagModel>> {
  id: CreationOptional<string>
  name: string
}

const Tag = connection.define<TagModel>('tags', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
})

const associate = () => {
  const Work = connection.models['works']

  Tag.belongsToMany(Work, {
    foreignKey: 'tag_id',
    through: 'work_tags',
    as: 'works'
  })
}

export default {
  Model: Tag,
  associate
}