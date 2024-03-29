const express = require("express");

class FollowersRouter {
  constructor(followersController) {
    this.follow = express.Router();

    this.followersController = followersController;

    this.follow.post("/follow/:followedId", (request, response) => {
      this.followersController.followUser(request, response);
    });

    this.follow.delete("/unfollow/:followedId", (request, response) => {
      this.followersController.unfollowUser(request, response);
    });
  }
  
  getRoutes() {
    return this.follow;
  }
}

module.exports = FollowersRouter;
