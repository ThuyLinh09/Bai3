import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);

// Import JSON config (TS cần "resolveJsonModule": true trong tsconfig.json)
import configFile from '../config/config.json';

// Định nghĩa môi trường
type Env = 'development' | 'test' | 'production';
const env = (process.env.NODE_ENV || 'development') as Env;

// Interface cho DBConfig, thêm use_env_variable
interface DBConfig {
  username?: string;
  password?: string | null;
  database?: string;
  host?: string;
  dialect: Dialect | string;
  logging?: boolean;
  use_env_variable?: string;
}

const config: DBConfig = configFile[env] as DBConfig;

// Interface cho object db
interface DB {
  [key: string]: any;
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
}

const db: DB = {};

// Khởi tạo Sequelize
let sequelize: Sequelize;

if (config.use_env_variable) {
  // Production dùng biến môi trường
  sequelize = new Sequelize(process.env[config.use_env_variable]!, {
    dialect: config.dialect as Dialect,
    host: config.host,
    logging: config.logging,
  });
} else {
  // Development / Test dùng config trực tiếp
  sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password!,
    {
      host: config.host,
      dialect: config.dialect as Dialect,
      logging: config.logging,
    }
  );
}

// Import tất cả model trong thư mục
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test') === -1
    );
  })
  .forEach(file => {
    const modelImport = require(path.join(__dirname, file));
    const model = modelImport(sequelize, DataTypes);
    db[model.name] = model;
  });

// Gọi associate nếu model có
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Xuất db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
