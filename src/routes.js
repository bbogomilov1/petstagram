const routes = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const photoController = require("./controllers/photoController");

routes.use(homeController);
routes.use("/users", userController);
routes.use("/photos", photoController);
routes.use("*", (req, res) => {
  res.redirect("/404");
});

module.exports = routes;
