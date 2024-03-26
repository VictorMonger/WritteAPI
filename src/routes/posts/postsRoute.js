const express = require("express");

class PostsRouter {
  constructor(postsController) {
    this.posts = express.Router();

    this.postsController = postsController;

    this.posts.post("/", (request, response) => {
      this.postsController.createPost(request, response);
    });

    this.posts.delete("/:postId", (request, response) => {
      this.postsController.deletePost(request, response);
    });

    this.posts.get("/:postId", (request, response) => {
      this.postsController.getPostInfo(request, response);
    });

    this.posts.post("/:postId/like", (request, response) => {
      this.postsController.likePost(request, response);
    });

    this.posts.delete("/:postId/unlike", (request, response) => {
      this.postsController.unlikePost(request, response);
    });
  }
  
  getRoutes() {
    return this.posts;
  }
}

module.exports = PostsRouter;
