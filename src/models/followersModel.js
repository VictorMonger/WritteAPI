class FollowersModel {
  constructor(connection) {
    this.connection = connection;
  }

  async followUser(followedId, followerId) {
    try {
      return await this.connection("followers").insert({
        followedId,
        followerId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async unfollowUser(followedId, followerId) {
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
