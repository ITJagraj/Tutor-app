const router = require('express').Router();
const withAuth = require('../auth');
const { Question, Answer, User, CategoryQuestion } = require('../../database/tables');

//find all questions
router.get('/', (req, res) => {
    Question.findAll({
        attributes: [
            'id',
          "question_title",
          "question_text",
          "user_id",
          'createdAt',
          'updatedAt'
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
            [sequelize.literal('(SELECT DISTINCT(category_name) FROM category JOIN categoryquestion ON category.id = categoryquestion.category_id JOIN question ON question.id = categoryquestion.question_id'), 'question_categories'],
            'createdAt',
            'updatedAt'
            //used to only display single categories from the question if there are duplicates
          ],
        include: [
            {
                model: User,
                attributes: ['id','username','first_name','last_name'],
            },
            {
                model: Answer,
                attributes: ['id','user_id','question_id','answer_text'],
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

//update question category
router.put('/:id/:category_name', withAuth, (req, res) => {
    Question.get({
        where: {
            id: req.params.id
        },
        attributes: [[sequelize.literal(`SELECT MIN(id) FROM category JOIN WHERE category_name = ${req.params.category_name} GROUP BY category_name`, 'question_category')]]
    })
    .then(dbQuestionData => {
        CategoryQuestion.create({
            question_id: dbQuestionData.question_id,
            category_id: dbQuestionData.question_category
          })
        } 
    ).then(dbQuestionData => {
        res.json(dbQuestionData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//delete question category
router.delete('/:id/:category_name', withAuth, (req, res) => {
    Question.get({
        where: {
            id: req.params.id
        },
        attributes: [[sequelize.literal(`SELECT MIN(id) FROM category JOIN WHERE category_name = ${req.params.category_name} GROUP BY category_name`, 'question_category')]]
    })
    .then(dbQuestionData => {
        CategoryQuestion.destroy({
            where: {
                question_id = dbQuestionData.question_id,
                category_id = dbQuestionData.question_category}
          })
        } 
    ).then(dbQuestionData => {
        res.json(dbQuestionData)
    })
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