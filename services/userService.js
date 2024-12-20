const {User} = require("../db/db");

const getUsers = async () => await User.findAll();

const getUserById = async (id) => await User.findByPk(id);

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

const createUser = async (user) => await User.create(user);

const deleteUserById = async(userId) => await User.destroy({
  where:{
      id:userId
  },
});

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  login,
  createUser,
  updateUser,
  deleteUserById  
};