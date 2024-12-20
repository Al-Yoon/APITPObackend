const UserService = require('../services/userService');
const jwt = require("jsonwebtoken");
const authenticationService = require("../services/authenticationService");
const express = require("express");
const bycrypt = require("bcrypt");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsers",
        message: err,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      let user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          method: "getUserById",
          message: "User not found",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({
        method: "getUserById",
        message: err,
      });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.status(200).json({
        message: "Created",
        user: newUser,
      });
    } catch (err) {
      res.status(500).json({
        method: "createUser",
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, contrasenia } = req.body;
      let isUserRegistered = await authenticationService.hasValidateCredentials(email, contrasenia);
      if (isUserRegistered) {
        const user = await UserService.getUserByEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: '1d',
          user,
          PRIVATE_KEY,
        });

        return res.status(200).json({
          status: 200,
          token: token, 
          message: "Token created successfully"
        });
        
      } else {
        return res.status(401).json({
          message: "Unauthorized."
        });
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }

async updateUser(req,res) {
    const{
        id
    } = req.params;
    try{
      console.log(req.body.contrasenia);
      if(req.body.contrasenia){
        req.body.contrasenia = bycrypt.hashSync(req.body.contrasenia, 10);
      }
      await UserService.updateUser(req.body,Number(id));
      const user = await UserService.getUserById(Number(id));
      res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

  async deleteUser(req, res) {
    try {
      let isUser = await UserService.getUserById(req.params.id);
      if (isUser) {
        await UserService.deleteUserById(req.params.id);
        return res.status(204).json({
          message: "User deleted"
        });
      }
      return res.status(404).json({
        message: "User not found"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteUser",
        message: err
      });
    }
  }
}

module.exports = new UserController();