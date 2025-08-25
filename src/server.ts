import express from "express"; //nạp express
import bodyParser from "body-parser"; // nạp body-parser lấy tham số từ client /user?id=7
import viewEngine from "./config/viewEngine"; //nạp viewEngine
import initWebRoutes from './route/web'; //nạp file web từ Route
import connectDB from './config/configdb';
import db from './models';

require('dotenv').config(); //gọi hàm config của dotenv để chạy lệnh process.env.PORT

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
viewEngine(app)
initWebRoutes(app);
connectDB();

db.sequelize?.sync({ force: true })
  .then(() => {
    console.log("All tables recreated!");
  })
  .catch(err => console.log(err));

let port = process.env.PORT || 6969; //tạo tham số port lấy từ .env
//Port === undefined => port = 6969
//chạy server
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: "+ port)
})