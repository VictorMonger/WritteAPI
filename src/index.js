const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());

const connection = require("./database/connection");
const validateToken = require("./middleware/authMiddleware");

const UsersModel = require("./models/usersModel");
const UsersController = require("./controllers/usersController");
const { UsersRouter } = require("./routes/");

const PostsModel = require("./models/postsModels");
const PostsController = require("./controllers/postsController");
const { PostsRouter } = require("./routes/");

const FollowersModel = require("./models/followersModel");
const FollowersController = require("./controllers/followersController");
const { FollowersRouter } = require("./routes/");

const usersModel = new UsersModel(connection);
const usersController = new UsersController(usersModel);
const usersRouter = new UsersRouter(usersController);

const postsModel = new PostsModel(connection);
const postsController = new PostsController(postsModel);
const postsRouter = new PostsRouter(postsController);

const followersModel = new FollowersModel(connection);
const followersController = new FollowersController(followersModel);
const followersRouter = new FollowersRouter(followersController);

app.use("/public/users", usersRouter.getRoutes());

app.use("/users", validateToken, usersRouter.getPrivateRoutes());

app.use("/posts", validateToken, postsRouter.getRoutes());

app.use("/followers", validateToken, followersRouter.getRoutes());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
