class PostsModel {
  constructor(connection) {
    this.connection = connection;
  }

  async createPosts(userId, content) {
    try {
      return await this.connection("posts")
        .insert({
          userId,
          content,
        })
        .returning("*");
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePosts(userId, postId) {
    try {
      return await this.connection("posts")
        .where("userId", userId)
        .andWhere("id", postId)
        .delete();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPostInfo(postId) {
    try {
      return await this.connection("posts")
        .select("users.UserName", "posts.content", "posts.likes")
        .innerJoin("users", "posts.userId", "users.id")
        .where("posts.id", postId)
        .first();
    } catch (error) {
      throw new Error(error);
    }
  }

  async postAlreadyLiked(postId, userId) {
    try {
      return await this.connection("likes")
        .where("postId", postId)
        .andWhere("userId", userId)
        .first();
    } catch (error) {
      throw new Error(error);
    }
  }

  async likePost(postId, userId) {
    try {
      await this.connection.transaction(async (trx) => {
        await trx("likes").insert({
          userId,
          postId,
        });
        await trx("posts").where("id", postId).increment("likes", 1);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async unlikePost(postId, userId) {
    try {
      await this.connection.transaction(async (trx) => {
        await trx("likes")
          .where("userId", userId)
          .andWhere("postId", postId)
          .delete();
        await trx("posts").where("id", postId).decrement("likes", 1);
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PostsModel;
