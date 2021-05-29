// import sequelize 
const Sequelize = require("sequelize");
//const sequelize = require("sequelize");

require ("dotenv").config(); //for loading env variables 

//create connection for the databadse
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
            decimalNumbers: true,
        },
    });

module.exports = sequelize;