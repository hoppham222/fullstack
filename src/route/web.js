import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.get("/hochoi", (req, res) => {
        return res.send('Pham Van Minh')
    });

    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.getCrudUser);
    router.get('/edit-crud', homeController.getEditCrud);

    router.post('/post-crud-test', homeController.postcrudtest)
    router.get('/delete-crud', homeController.postdelete)

    router.post('/api/login', userController.handLogin)
    

    return app.use("/", router);
}

module.exports =  initWebRoutes ;