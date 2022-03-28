
import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw:true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage= 'Your Email test2'
                }
                
            } else {
                userData.errCode = 1;
                userData.errMessage= 'Your Email'
                
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
    
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve,reject) => {
      try {
          let user = await db.User.findOne({
              where:{email: email}
          })

          if (user) {
              resolve(true)
          } else {
              resolve(false)
          }
      } catch (e) {
          reject(e);
      }
  })
}

module.exports = {
    handleUserLogin:handleUserLogin,
}