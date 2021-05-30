const router = require('express').Router();
const withAuth = require('../auth');
const { Question, Answer, User } = require('../../database/tables');

//find all questions
router.get('/', (req, res) => {
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
            [sequelize.literal('(SELECT DISTINCT(category_name) FROM category JOIN categoryquestion ON category.id = categoryquestion.category_id JOIN question ON question.id = categoryquestion.question_id'), 'question_categories']
            //used to only display single categories from the question if there are duplicates
          ],
        include: [
            {
                model: User,
                attributes: ['id','username','first_name','last_name'],
            },
            {
                model: Answer,
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