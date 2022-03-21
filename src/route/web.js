import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.get("/hochoi", (req, res) => {
        return res.send('Pham Van Minh')
    });

    router.post('/post-crud', homeController.postCrud);

    return app.use("/", router);
}

module.exports =  initWebRoutes ;