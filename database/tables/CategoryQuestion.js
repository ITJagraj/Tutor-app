const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class CategoryQuestion extends Model {};

CategoryQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
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
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'category_question'
    }
  );


module.exports = CategoryQuestion;