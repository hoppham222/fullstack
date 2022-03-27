
import req from 'express/lib/request';
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
let getCrudUser = async (req, res) => {
    let data = await createNewUser.getAllUser();
    // console.log(data);
    return res.render('getCROD.ejs',{data:data});
}

let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await createNewUser.getUserInfoById(userId);
        // console.log(userData);
        return res.render('editCrud.ejs', {
            user: userData
        });
    } else {
        return res.send('user not found!');
    }  
}

let postcrudtest = async (req, res) => {
    let data = req.body;
    let allUsers = await createNewUser.updateUserData(data);
    return res.render('getCROD.ejs', {
        data: allUsers
    });
    
}

let postdelete = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await createNewUser.deleteUserById(id);
        return res.send('delete');
    } else {
        return res.send('not delete');
    }
    
}


module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    getCrudUser: getCrudUser,
    getEditCrud: getEditCrud,
    postcrudtest: postcrudtest,
    postdelete: postdelete,
}