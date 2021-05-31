const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Answer extends Model {}

Answer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      answer_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [7],
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'question',
            key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'answer'
    }
  );

  module.exports = Answer;