const {User} = require("../db/db");

//el ORM se encarga de todo
const getUsers = async ()=> await User.findAll(); //select * from users
const getUserById = async ()=> await User.findByPk(id); // select * from users where id = id
const createUser = async ()=> await User.create(user); // insert into users values ...
const updateUser = async ()=> await User.updateUser(id); // insert projects tickets values ...
const deleteUser = async ()=> await User.deleteUser(id);

module.exports ={
    getUsers,
    getUserById,
    createUser,
}