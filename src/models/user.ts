import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Định nghĩa interface cho các trường trong User
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: boolean;
  image?: string | null;
  roleId?: string | null;
  positionId?: string | null;
}

// Khi tạo User mới, id là auto increment, image/roleId/positionId có thể không có
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'image' | 'roleId' | 'positionId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
  public phoneNumber!: string;
  public gender!: boolean;
  public image!: string | null;
  public roleId!: string | null;
  public positionId!: string | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // define association here
  }
}

// Hàm khởi tạo model
export default (sequelize: Sequelize) => {
  User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    positionId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  }
);


  return User;
};
