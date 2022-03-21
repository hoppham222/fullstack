
import db from '../models/index';
import createNewUser from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs",{data: JSON.stringify(data)});
    } catch (error) {
        console.log(error);
    }

}
let getCrud = (req, res) => {
    return res.render("crud.ejs");
    // return res.send('Phạm Văn');
}

let postCrud =async (req, res) => {
    let message = await createNewUser.createNewUser(req.body);
    console.log(message);
    return res.send('1121221');
}
module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud:postCrud,
}