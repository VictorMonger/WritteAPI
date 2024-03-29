class FollowersController {
  constructor(followersModel) {
    this.followersModel = followersModel;
  }

  async followUser(request, response) {
    try {
      const { followedId } = request.params;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      await this.followersModel.followUser(followedId, id);

      return response
        .status(200)
        .json({ message: "User followed successfully." });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to follow user." });
    }
  }

  async unfollowUser(request, response) {
    try {
      const { followedId } = request.params;
      const { user } = request.headers;

      const tokenUserObject = JSON.parse(user);
      const { id } = tokenUserObject;

      await this.followersModel.unfollowUser(followedId, id);

      return response
        .status(200)
        .json({ message: "User unfollowed successfully." });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to unfollow user." });
    }
  }  
}

module.exports = FollowersController;
