class PostsController {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async createPosts(request, response) {
    try {
      const { content } = request.body;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      if (!content) {
        return response
          .status(400)
          .json({ error: "Write something to Writte" });
      }

      const post = await this.postsModel.createPosts(id, content);

      return response.status(201).json(post);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deletePosts(request, response) {
    try {
      const { postId } = request.params;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      await this.postsModel.deletePosts(postId, id);

      return response
        .status(200)
        .json({ message: "Post deleted successfully." });
    } catch (error) {
      return response.status(500).json({ error: "Failed to delete the post" });
    }
  }

  async getPostInfo(request, response) {
    try {
      const { postId } = request.params;

      const postInfo = await this.postsModel.getPostInfo(postId);

      if (!postInfo) {
        return response.status(404).json({ error: "Post not found." });
      }

      return response.status(200).json(postInfo);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to get post information." });
    }
  }

  async likePost(request, response) {
    try {
      const { postId } = request.params;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      const likedPost = await this.postsModel.postAlreadyLiked(postId, id);

      if (likedPost) {
        return response.status(400).json({ message: "Post already liked." });
      }

      await this.postsModel.likePost(postId, id)

      return response.status(200).json({ message: "Post liked successfully." });
    } catch (error) {
      return response.status(500).json({ error: "Failed to like Post." });
    }
  }

  async unlikePost(request, response) {
    try {
      const { postId } = request.params;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      await this.postsModel.unlikePost(postId, id);

      return response
        .status(200)
        .json({ message: "Post unliked successfully." });
    } catch (error) {
      return response.status(500).json({ error: "Failed to unlike Post." });
    }
  }
}

module.exports = PostsController;
