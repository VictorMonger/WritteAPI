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
        .insert({
          userName,
          firstName,
          lastName,
          email,
          password,
        })
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

  async createPosts(request, response) {
    
  }
}

module.exports = UsersModel;
