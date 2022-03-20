import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/",homeController.getHomePage);
    router.get("/hochoi", (req, res) => {
        return res.send('Pham Van Minh')
    });

    return app.use("/", router);
}

module.exports =  initWebRoutes ;