const { createUserToken } = require("../lib/auth");

class UsersController {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async signUp(request, response) {
    try {
      const { userName, firstName, lastName, email, password } = request.body;
      const failsInsert =
        !userName || !firstName || !lastName || !email || !password;

      if (failsInsert) {
        return response
          .status(400)
          .json({ error: "Insert all required fields" });
      }

      const userNameExist = await this.usersModel.userNameExists(userName);

      if (userNameExist) {
        return response.status(400).json({ error: "Username already in use" });
      }

      const userEmailExist = await this.usersModel.emailExists(email);

      if (userEmailExist) {
        return response
          .status(400)
          .json({ error: "E-mail already registered" });
      }

      const user = {
        userName,
        firstName,
        lastName,
        email,
        password,
      };

      const userSignUp = await this.usersModel.signUp(user);

      return response.status(201).json(userSignUp);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async signIn(request, response) {
    const { cpf, password } = request.body;

    const user = await this.usersModel.signIn(cpf, password);

    if (!user) {
      return response.status(404).json({ msg: "User not found" });
    }

    delete user.password;

    const token = createUserToken(user);

    return response.status(200).json({
      data: {
        user,
        token,
      },
    });
  }
}

module.exports = UsersController;
