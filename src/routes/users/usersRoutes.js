const express = require("express");

class UsersRouter {
  constructor(usersController) {
    this.users = express.Router();
    this.privateUsers = express.Router()

    this.usersController = usersController;

    this.users.post("/signUp", (request, response) => {
      this.usersController.signUp(request, response);
    });

    this.users.post("/signIn", (request, response) => {
      this.usersController.signIn(request, response);
    });

    this.privateUsers.get("/", (request, response) => {
      this.usersController.getAll(request, response);
    });

    this.privateUsers.get("/:userId/following", (request, response) => {
      this.usersController.getFollowingByUser(request, response);
    });

    this.privateUsers.get("/:userId/followers", (request, response) => {
      this.usersController.getUserFollowers(request, response);
    });
  }

  getRoutes() {
    return this.users;
  }

  getPrivateRoutes() {
    return this.privateUsers;
  }
}

module.exports = UsersRouter;
