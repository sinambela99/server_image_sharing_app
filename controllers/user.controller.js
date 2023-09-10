const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  // Register User
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({
        username,
        email,
        password,
      });

      res.status(200).json({ message: `New user with id ${user.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  // Login User
  static async login(req, res, next) {
    try {
      const { email, password } = req.body; //fields
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({
        statusCode: 200,
        id: user.id,
        access_token: token,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get All User
  static async getAllUser(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  // Get User By Id
  static async getUserById(req, res, next) {
    try {
      const result = await User.findByPk(req.params.id);
      if (!result) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Update User
  static async updateUser(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        throw { name: "NotFound" };
      }

      const { name, email, password } = req.body;

      User.update(
        {
          name,
          email,
          password,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `User id ${req.params.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  // Delete User
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (user == null) {
        throw { name: "NotFound" };
      }
      if (!user) {
        throw { name: "NotFound" };
      }

      User.destroy({ where: { id } });

      res.status(200).json({ message: `User with id ${user.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
