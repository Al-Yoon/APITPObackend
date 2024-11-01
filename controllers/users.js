const UserService = require('../services/users');

const getUsers = async(req,res) =>{
    try{
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const getUserById = async(req,res) =>{
    const{
        id
    } = req.params;
    try{
        const user = await UserService.getUserById(Number(id));
        if(!user) res.status(404).json({
            message: "User Not Found"
        });
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

    const createUsers = async(req,res) =>{
    try{
        const user = await UserService.createUser(req.body);
            res.status(200).json(user);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports ={
    getUsers,
    getUserById,
    createUsers
}
