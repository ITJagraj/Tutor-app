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
  
  // define table columns and configuration
  User.init(
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
      username: {
        type: DataTypes.STRING,
        isAlphanumeric: true, // used to make sure the password is alphanumeric
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [4],
          }
      },
      first_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        allowNull: true,
        validate: {
            // this means the password must be at least four characters long
            len: [2],
          }
      },
      last_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        allowNull: true,
        validate: {
            // this means the password must be at least four characters long
            len: [2],
          }
      },
      role: {
        type: DataTypes.STRING(64),
        isAlpha: true, // used to make sure the password is alphanumeric 
        allowNull: true,
        validate: {
          // this means the password must be at least four characters long
          len: [3],
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING(64),
        isAlphanumeric: true, // used to make sure the password is alphanumeric 
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
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
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

module.exports = User;