
import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashPasswordFrom = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFrom,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender==='1'? true:false,
                roleId: data.roleId,
            })
            resolve('ok create a new user server')
        } catch (error) {
            reject(error);
        }
    })
    
    console.log(hashPasswordFrom);
    console.log(data);
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpassword = await bcrypt.hashSync(password, salt);
            resolve(hashpassword);
        } catch (e) {
            reject(e);   
        }
    })
}

let getAllUser = async () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw:true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: id },
                raw: true,
            })

            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
          
      } catch (e) {
          reject(e);
          
      }
  })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastname;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve();
            }
            
        } catch (error) {
            
        }
    })
}
let deleteUserById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id:id}
            })
            if (user) {
                await user.destroy();
            } 
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}