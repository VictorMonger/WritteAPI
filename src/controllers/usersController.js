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
        return response.status(400).json({ error: "username already in use" });
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

      await this.usersModel.signUp(user);

      return response.status(201).json({ msg: "successfully registered" });
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async signIn(request, response) {
    try {
      const { userName, password } = request.body;

      if (!userName || !password) {
        return response
          .status(400)
          .json({ error: "Insert all required fields" });
      }

      const user = await this.usersModel.signIn(userName, password);

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
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(request, response) {
    try {
      const users = await this.usersModel.getAll();

      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: "Failed to get all users." });
    }
  }

  async getFollowingByUser(request, response) {
    try {
      const { userId } = request.params;

      const followedUsers = await this.usersModel.getFollowingByUser(userId);

      return response.status(200).json(followedUsers);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to list following users." });
    }
  }

  async getUserFollowers(request, response) {
    try {
      const { userId } = request.params;

      const userFollowers = await this.usersModel.getUserFollowers(userId);

      return response.status(200).json(userFollowers);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to list following users." });
    }
  }
}

module.exports = UsersController;
