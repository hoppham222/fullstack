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

module.exports = {
    createNewUser: createNewUser,
}