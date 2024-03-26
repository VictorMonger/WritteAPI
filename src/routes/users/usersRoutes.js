const express = require("express");

class UsersRouter {
  constructor(usersController) {
    this.users = express.Router();

    this.usersController = usersController;

    this.users.post("/signUp", (request, response) => {
      this.usersController.signUp(request, response);
    });

    this.users.post("/signIn", (request, response) => {
      this.usersController.signIn(request, response);
    });

    this.users.get("/private", (request, response) => {
      this.usersController.getAll(request, response);
    });

    this.users.get("/private/:userId", (request, response) => {
      this.usersController.getFollowingByUser(request, response);
    });

    this.users.get("/private/:userId", (request, response) => {
      this.usersController.getUserFollowers(request, response);
    });
  }

  getRoutes() {
    return this.users;
  }
}

module.exports = UsersRouter;
