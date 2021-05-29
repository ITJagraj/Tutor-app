const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Organization extends Model {}

module.exports = Organization;