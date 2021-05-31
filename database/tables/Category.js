const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Category extends Model {}

Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
          }
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );

module.exports = Category;