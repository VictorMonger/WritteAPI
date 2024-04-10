class UsersModel {
  constructor(connection) {
    this.connection = connection;
  }

  async userNameExists(userName) {
    try {
      return await this.connection("users")
        .select("userName")
        .where("userName", userName)
        .first();
    } catch (error) {
      throw new Error(error);
    }
  }

  async emailExists(email) {
    try {
      return await this.connection("users")
        .select("email")
        .where("email", email)
        .first();
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUp(user) {
    try {
      const { userName, firstName, lastName, email, password } = user;

      return await this.connection("users")
        .insert(user)
        .returning("*");
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn(userName, password) {
    try {
      const user = await this.connection("users")
        .select("*")
        .where("userName", userName)
        .orWhere("email", userName)
        .andWhere("password", password)
        .first();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await this.connection("users").select("*");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFollowingByUser(userId) {
    try {
      return await this.connection("followers")
        .join("users", "followers.followedId", "users.id")
        .where("followers.followerId", userId)
        .select("users.userName");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserFollowers(userId) {
    try {
      return await this.connection("followers")
        .join("users", "followers.followerId", "users.id")
        .where("followers.followedId", userId)
        .select("users.userName");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUserPosts(userId) {
    try {
      return await this.connection("posts")
        .select(
          "users.userName",
          "posts.content",
          "posts.created_at",
          "posts.likes"
        )
        .innerJoin("users", "posts.userId", "users.id")
        .where("userId", userId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UsersModel;
