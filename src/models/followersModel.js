class FollowersModel {
  constructor(connection) {
    this.connection = connection;
  }

  async followUser(followerId, followedId) {
    try {
      return await this.connection("followers").insert({
        followerId,
        followedId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async unfollowUser(followerId, followedId) {
    try {
      return await this.connection("followers")
        .where("followerId", followerId)
        .andWhere("followedId", followedId)
        .delete();
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FollowersModel;
