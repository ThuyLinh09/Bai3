import bcrypt from 'bcryptjs';
import db from '../models/index';
import initUser from '../models/user'; // nếu bạn export User model riêng
import { FindOptions } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

// interface cho dữ liệu tạo user
interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string | boolean;
  roleId?: string;
  image?: string | null;
  positionId?: string | null;
}

// hash password
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
}

// tạo user mới
const createNewUser = async (data: IUserCreate): Promise<string> => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1' ? true : data.gender === true ? true : false,
      roleId: data.roleId,
      image: data.image || null,
      positionId: data.positionId || null,
    });
    return 'OK create a new user successful';
  } catch (e) {
    throw e;
  }
}

// lấy tất cả user
const getAllUser = async (): Promise<any[]> => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    throw e;
  }
}

// lấy user theo id
const getUserInfoById = async (userId: number): Promise<any> => {
  try {
    const user = await db.User.findOne({ where: { id: userId }, raw: true });
    return user || null;
  } catch (e) {
    throw e;
  }
}

// update user
interface IUserUpdate {
  id: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
}

const updateUser = async (data: IUserUpdate): Promise<any[]> => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (user) {
      if (data.firstName) user.firstName = data.firstName;
      if (data.lastName) user.lastName = data.lastName;
      if (data.address) user.address = data.address;
      if (data.phoneNumber) user.phoneNumber = data.phoneNumber;
      await user.save();
      const allUsers = await db.User.findAll({ raw: true });
      return allUsers;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}

// delete user theo id
const deleteUserId = async (userId: number): Promise<void> => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    throw e;
  }
}

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserId,
};
