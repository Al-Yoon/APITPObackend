const {User} = require("../db/db");

//el ORM se encarga de todo
const getUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);// select * from users where id = id
const updateUser = async (user,id) => await User.update(
  user,{
      where:{
          id:id
      }
  }
);
const login = async (email,contrasenia) => await User.findOne({
      where:{
          email:email,
          contrasenia: contrasenia,
      }
  }
);
const getUserByEmail = async(email) => await User.findOne({
  where:{
      email:email
  }
});
const createUser = async (user) => await User.create(user);// insert into users values ...
const deleteUser = async (id) => await User.destroy({ where: { id } });

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  login,
  createUser,
  updateUser,
  deleteUser  
};