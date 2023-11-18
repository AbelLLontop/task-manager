const UserService = require("../services/UserService");
const { schemaUserUpdate } = require("../validator/User");

class UserController {
  userService = new UserService();
  async getUser(req, res, next) {
    const user = await this.userService.getUser(req.userToken.id);
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(200).send(user);
  }
  async updateUser(req, res, next) {
    try {
      const { id } = req.userToken;
      const { email, name, newPassword, password } =
        await schemaUserUpdate.validate(req?.body, {
          strict: true,
          abortEarly: false,
        });
      const { file } = req;
      const data = await this.userService.updateUser({
        id,
        email,
        name,
        newPassword,
        password,
        file,
      });
      if (!data) {
        return res.status(400).send({
          status: "error",
          message: "User not found",
        });
      }
      return res.status(200).send({
        message: "User updated",
      });
    } catch (e) {
      next(e);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const { id } = req.userToken;
      console.log(id);

      const data = await this.userService.deleteUser(id);
      if (!data) {
        return res.status(400).send({
          status: "error",
          message: "User not found",
        });
      }
      return res.status(200).send({
        message: "User deleted",
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
