import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { connection } from '..'

interface ManagerModel extends Model<InferAttributes<ManagerModel>, InferCreationAttributes<ManagerModel>> {
  id: CreationOptional<string>
  email: string
  password: string
}

const Manager = connection.define<ManagerModel>('managers', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
})

export default {
  Model: Manager,
}