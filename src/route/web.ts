import express, { Request, Response } from "express";
import * as homeController from "../controller/homeController"; // ✅ dùng * as cho named export

let route = express.Router();

const initWebRoutes = (app: express.Application) => {
    route.get('/', (req: Request, res: Response) => {
        return res.send('Nguyễn Hoàng Thùy Linh');
    });

    route.get('/home', homeController.getHomePage);
    route.get('/about', homeController.getAboutPage);
    route.get('/crud', homeController.getCRUD);
    route.post('/post-crud', homeController.postCRUD);
    route.get('/get-crud', homeController.getFindAllCrud);
    route.get('/edit-crud', homeController.getEditCRUD);
    route.post('/put-crud', homeController.putCRUD);
    route.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", route);
}

export default initWebRoutes;
