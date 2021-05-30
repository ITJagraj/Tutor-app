const router = require('express').Router();
const withAuth = require('../auth');
const { Question } = require('../../database/tables');

router.get('/', (req, res) => {
    Question.findAll()
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Question.create({
        question_title: req.body.question_title,
        question_text: req.body.question_text,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Question.update({
        where: {
            id: req.params.id
        },
        question_title: req.body.question_title,
        question_text: req.body.question_text,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Question.destroy({
        where: {
            id: req.params.id
        },
        question_title: req.body.question_title,
        question_text: req.body.question_text,
        user_id: req.body.user_id,
        category_id: req.body.category_id
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;