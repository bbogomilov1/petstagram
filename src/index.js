const express = require("express");
const routes = require("./routes");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middlewares/authMiddleware");

const PORT = 3000;

const app = express();

// todo:change db name
mongoose
  .connect(`mongodb://127.0.0.1:27017/petstagram`)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(`DB Error: ${err.message}`));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(routes);

app.listen(PORT, console.log(`listening on port ${PORT}`));
