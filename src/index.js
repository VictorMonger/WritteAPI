const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());

const connection = require("./database/connection");
const { verifyToken } = require("./lib/auth");

const UsersModel = require("./models/usersModel");
const UsersController = require("./controllers/usersController");
const { UsersRouter } = require("./routes/");

const usersModel = new UsersModel(connection);
const usersController = new UsersController(usersModel);
const usersRouter = new UsersRouter(usersController);

const PostsModel = require("./models/postsModels");
const PostsController = require("./controllers/postsController");
const { PostsRouter } = require("./routes/");

const postsModel = new PostsModel(connection);
const postsController = new PostsController(postsModel);
const postsRouter = new PostsRouter(postsController);

const FollowersModel = require("./models/followersModel");
const FollowersController = require("./controllers/followersController");
const { FollowersRouter } = require("./routes/");

const followersModel = new FollowersModel(connection);
const followersController = new FollowersController(followersModel);
const followersRouter = new FollowersRouter(followersController);

app.use("/users", usersRouter.getRoutes());

app.use("/users/private", verifyToken, usersRouter.getRoutes());

app.use("/posts/", verifyToken, postsRouter.getRoutes())

app.use("/follows/", verifyToken, followersRouter.getRoutes())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});