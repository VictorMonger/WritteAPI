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
}

module.exports = UsersController;
