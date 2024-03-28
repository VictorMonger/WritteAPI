const express = require("express");

class PostsRouter {
  constructor(postsController) {
    this.posts = express.Router();

    this.postsController = postsController;

    this.posts.post("/", (request, response) => {
      this.postsController.createPosts(request, response);
    });

    this.posts.delete("/:postId", (request, response) => {
      this.postsController.deletePosts(request, response);
    });

    this.posts.get("/:postId", (request, response) => {
      this.postsController.getPostInfo(request, response);
    });

    this.posts.post("/like/:postId", (request, response) => {
      this.postsController.likePost(request, response);
    });

    this.posts.delete("/unlike/:postId", (request, response) => {
      this.postsController.unlikePost(request, response);
    });
  }
  
  getRoutes() {
    return this.posts;
  }
}

module.exports = PostsRouter;
