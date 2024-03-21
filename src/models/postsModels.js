class PostsModel {
  constructor(connection) {
    this.connection = connection
  }

  async createPosts(userName, content) {
    try {
      return await this.connection("posts")
        .insert({
          userName,
          content,
        })
        .returning("*");
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = PostsModel;