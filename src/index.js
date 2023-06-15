const express = require("express");
const routes = require("./routes");
const handlebars = require("express-handlebars");
const PORT = 3000;
const path = require("path");

const app = express();

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

app.use(routes);

app.listen(PORT, console.log(`listening on port ${PORT}`));
