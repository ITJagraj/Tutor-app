const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

module.exports = Question;

// define table columns and configuration
Question.init(
    {
      // define an id column
      id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
       // define a username column
       title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [1],
          }
      },
      // define a username column
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [1],
          }
      },
      //-----------------------------------need the question body
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );