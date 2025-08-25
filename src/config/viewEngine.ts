import express, { Express } from "express";
//javascript theo ES6
const configViewEngine = (app: Express) => {
    app.use(express.static("./src/public")); //Thiết lập thư mục tĩnh chứa images, css, ...
    app.set("view engine", "ejs"); //Thiết lập view Engine
    app.set("views", "./src/views") //Thư mục chứa views
}
export default configViewEngine;