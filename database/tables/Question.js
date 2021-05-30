const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Question extends Model {
  //will display all the question's categories
  static addCategories(body,model)
  {
    return model.CategoryQuestion.create({
      question_id: body.question_id,
      category_id: body.category_id
    }).then(() => {
      return Question.findOne({
        where: {
          id: body.question_id
        },
        attributes: [
          'id',
          "question_title",
          "question_text",
          "user_id",
          'created_at',
          [sequelize.literal('(SELECT DISTINCT(category_name) FROM category JOIN categoryquestion ON category.id = categoryquestion.category_id JOIN question ON question.id = categoryquestion.question_id'), 'question_categories']
          //used to only display single categories from the question if there are duplicates
        ]
      });
    });
  }
}

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
        // double check the unique 
        references: {
            model: 'user', 
            key: 'id'
        }
      }
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