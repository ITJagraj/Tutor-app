const User = require('./User');
const Category = require('./Category');
const Question = require('./Question');
const Answer = require('./Answer');
const Organization = require('./Organization');

User.hasMany(Question, {
    foreignKey: 'user_id'
});

Question.belongsTo(User, {
    foreignKey: 'user_id'
});

Question.belongsToMany(Category, {
    foreignKey: 'question_id'
});

Category.belongsToMany(Question, {
    foreignKey: 'category_id'
});



module.exports = { User, Category, Question, Answer, Organization };