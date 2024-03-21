const express = require("express");

class PostsRouter {
  constructor(postsController) {
    this.posts = express.Router();

    this.postsController = postsController;

    this.posts.post("/", (request, response) => {
      this.postsController.createPost(request, response);
    });
  }
  
  getRoutes() {
    return this.posts;
  }
}

module.exports = PostsRouter;
