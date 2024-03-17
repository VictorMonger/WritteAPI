const express = require("express");

class UsersRouter {
  constructor(usersController) {
    this.users = express.Router();

    this.usersController = usersController;

    this.users.post("/", (request, response) => {
      this.usersController.signUp(request, response);
    });
  }

  getRoutes() {
    return this.users;
  }
}

module.exports = UsersRouter;
