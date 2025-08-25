import { Request, Response } from 'express';
import db from '../models/index';
import CRUDService from '../service/CRUDService';

export const getHomePage = async (req: Request, res: Response) => {
  try {
    const data = await db.User.findAll();
    console.log('...');
    console.log(data);
    console.log('...');
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal Server Error');
  }
};

export const getAboutPage = (req: Request, res: Response) => {
  return res.render('test/about.ejs');
};

export const getCRUD = async (req: Request, res: Response) => {
  try {
    const users = await CRUDService.getAllUser();
    return res.render('crud', { datalist: users, data: null });
  } catch (e) {
    console.error(e);
    return res.render('crud', { datalist: [], data: null });
  }
};

export const getFindAllCrud = async (req: Request, res: Response) => {
  const data = await CRUDService.getAllUser();
  return res.render('users/findAllUser.ejs', { datalist: data });
};

export const postCRUD = async (req: Request, res: Response) => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('Post CRUD to server thành công');
};

export const getEditCRUD = async (req: Request, res: Response) => {
  const userIdStr = req.query.id as string;

  if (userIdStr) {
    const userId = parseInt(userIdStr, 10); // convert string -> number
    const userData = await CRUDService.getUserInfoById(userId);
    return res.render('user/editUser.ejs', { data: userData });
  } else {
    return res.send('Không lấy được id');
  }
};


export const putCRUD = async (req: Request, res: Response) => {
  const data = req.body;
  const updatedUsers = await CRUDService.updateUser(data);
  return res.render('user/findAllUser.ejs', { datalist: updatedUsers });
};

export const deleteCRUD = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (id) {
    await CRUDService.deleteUserId(parseInt(id as string, 10));
    return res.send('Deleted!!!!');
  } else {
    return res.send('Not find user');
  }
};
