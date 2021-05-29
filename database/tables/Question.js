const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Question extends Model {}

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
       question_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [7],
          }
      },
      // define a username column
      question_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [7],
          }
      },
      // define an id column
      user_id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        unique: true,
        // double check the unique 
        references: {
            model: 'user', 
            key: 'id'
        }
      },// define an id column
      category_id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        }
      }
      // answer_id: {
      //   // use the special Sequelize DataTypes object provide what type of data it is
      //   type: DataTypes.INTEGER,
      //   // this is the equivalent of SQL's `NOT NULL` option
      //   allowNull: false,
      //   references: {
      //       model: 'answer',
      //       key: 'id'
      //   }
      // },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'question'
    }
  );

  module.exports = Question;