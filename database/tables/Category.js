const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Category extends Model {}

// define table columns and configuration
Category.init(
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
      category_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [1],
          }
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );

module.exports = Category;