require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../db/models/users");

//Servicio para autenticar credenciales al hacer el metodo de login en Controller de Users
class AuthService{
    async hasValidateCredentials(email,contrasenia){
        try{
            const hashedContrasenia = await bcrypt.hash(contrasenia,process.env.SALT);//hashea lo que paso
            const user = await UserModel.findOne({ //exista user con el mail
                email
            });

            if(user && hashedContrasenia === user.contrasenia){ //y la contraseña hasheada es =, el user existe, por lo que se loguea
                return true;
            }
            return false;
        } catch(err){
            console.log(err);
            throw new Error("Error in credentials validation");
        }
    }
}

module.exports = new AuthService;