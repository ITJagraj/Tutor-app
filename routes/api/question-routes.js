const router = require('express').Router();
const withAuth = require('../auth');
const { Question, Category, User } = require('../../database/tables');

//find all questions
router.get('/', (req, res) => {
    console.log("TTTTRRRRRIIIIAAAAALLLL");
    Question.findAll({
        
        attributes: [
            'id',
          "question_title",
          "question_text",
          "user_id",
        //   'created_at',
        //   'updated_At'
        ],
        include: [
            {
                model: User,
                attributes: ['id','username','first_name','last_name'],
            },
        ]
    })
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//find one question
router.get('/:id', (req, res) => {
    Question.findOne({
        attributes: [
            'id',
          "question_title",
          "question_text",
          "user_id",
          'created_at',
          'updated_At'
        ],
        include: [
            {
                model: Category,
                attributes: ['id','category_name'],
            },
            {
                model: User,
                attributes: ['id','username','first_name','last_name'],
            },
        ]
    })
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
        category_id: req.body.category_id
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
        question_text: req.body.question_text
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
        category_name: req.body.category_name,
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;