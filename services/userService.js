const {User} = require("../db/db");

//el ORM se encarga de todo
const getUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);// select * from users where id = id
const createUser = async (user) => await User.create(user);// insert into users values ...
const updateUser = async (id, user) => await User.update(user, { where: { id } });// insert projects tickets values ...
const deleteUser = async (id) => await User.destroy({ where: { id } });

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};