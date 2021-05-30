const User = require('./User');
const Category = require('./Category');
const Question = require('./Question');
const Answer = require('./Answer');
const Organization = require('./Organization');
const CategoryQuestion = require('./CategoryQuestion')

User.hasMany(Question, {
    foreignKey: 'user_id'
});

Question.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Question.belongsToMany(Category, {
    through: CategoryQuestion,
    as: 'question_categories',
    foreignKey: 'question_id'
});

Category.belongsToMany(Question, {
    through: CategoryQuestion,
    as: 'question_categories',
    foreignKey: 'category_id'
});

User.hasMany(Answer, {
    foreignKey: 'user_id'
});

Answer.belongsTo(User, {
    foreignKey: 'user_id'
});

Question.hasMany(Answer, {
    foreignKey: 'question_id'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Category, Question, Answer, Organization, CategoryQuestion };