const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {

    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        allowNull: false,
        validate: {
            len: [4],
          }
      },
      first_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        allowNull: true,
        validate: {
            len: [2],
          }
      },
      last_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        allowNull: true,
        validate: {
            len: [2],
          }
      },
      role: {
        type: DataTypes.STRING(64),
        isAlpha: true,
        allowNull: true,
        validate: {
          len: [3],
        }
      },
      password: {
        type: DataTypes.STRING(64),
        isAlphanumeric: true,
        allowNull: false,
        validate: {
          len: [8,15],
        }
      }
    },
    {
      hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);// 10 refers to the number of salt rounds
      return newUserData;
    },
    // set up beforeUpdate lifecycle "hook" functionality
    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    },
      },
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

module.exports = User;