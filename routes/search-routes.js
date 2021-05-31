const router= require('express').Router();
const sequelize= require('../config/connection');
const { Question, Answer, User,Category, CategoryQuestion } = require('../database/tables');


router.get('/', (req, res) => {
    Question.findAll({
        attributes: ['question_title', 'question_text']
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


