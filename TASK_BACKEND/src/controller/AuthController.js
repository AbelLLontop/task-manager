const AuthService = require("../services/AuthService");
const { schemaUser, schemaUserCredentials } = require("../validator/User");

class AuthController {
  authService = new AuthService();

  async login(req, res, next) {
    try {
      const { email, password } = await schemaUserCredentials.validate(
        req.body,
        { strict: true, abortEarly: false }
      );
      const token = await this.authService.login({ email, password });
      if (!token) {
        return res.status(401).send({
          status: "error",
          message: "Invalid credentials",
        });
      }
      return res.status(200).send({ token });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async register(req, res, next) {
    try {
      const { email, password, name } = await schemaUser.validate(req.body, {
        strict: true,
        abortEarly: false,
      });
      const token = await this.authService.register({ email, password, name });
      if (!token) {
        return res.status(400).send({
          status: "error",
          message: "User already exists",
        });
      }
      return res.status(200).send({ token });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
