const express = require("express");
// require path 
const path = require("path");
//require routes
const routes = require("./routes");
//require handlebars
const exphbs = require("express-handlebars");
//req session
const session = require("express-session");
const Sequelize  = require("./config/connection");
//req sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sesh = {
    secret: 'Super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: Sequelize,
    }),
};
//initalizing the server
const app = express();
const PORT = process.env.PORT || 3008;

//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "public")));
app.use(session(sesh));

//use routes
app.use("/", routes);

//middlewear
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

Sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});