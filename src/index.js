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
const postController = new PostsController(postsModel);
const postsRouter = new PostsRouter(postController);

app.use("/users", usersRouter.getRoutes());

app.use("/posts/", verifyToken, postsRouter.getRoutes())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});