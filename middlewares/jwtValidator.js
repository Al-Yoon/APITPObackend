require("dotenv").config();
const jwt = require("jsonwebtoken"); //LIBRERIA JWT

const validateJwt = async(req,res,next) =>{
    try{
        const jwtValidate = jwt.verify(req.headers.jwt, process.env.PRIVATE_KEY); //SE HACE LA VERIFICACION, CON EL TOKEN QUE RECIBIMOS Y LA LLAVE SECRETA
        if(jwtValidate){
            next(); //si esta todo ok, se pasa a la sig funcion, el controller, se crea el projecto
        } else{
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized",
    });
    }
};

module.exports = validateJwt;