const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Question extends Model {}

Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
      },
       question_title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [7],
          }
      },
      question_text: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [7],
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user', 
            key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'question'
    }
  );

  module.exports = Question;