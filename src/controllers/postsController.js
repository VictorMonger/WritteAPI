class PostsController {
  constructor(postsModel){
    this.postsModel = postsModel;
  }

  async createPosts(request, response) {
    try {
      const { content } = request.body;
      const { userName } = request.params;

      if (!content) {
        return response
          .status(400)
          .json({ error: "Write something to Writte" });
      }

      const post = await this.postsModel.createPosts(userName, content);

      return response.status(201).json(post);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = PostsController;
