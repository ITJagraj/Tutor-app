const router = require('express').Router();
const withAuth = require('../auth');
const { Question, Answer, User,Category, CategoryQuestion } = require('../../database/tables');
const { Op } = require('sequelize');

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
        where: {
            id: req.params.id
        },
        include: [
            { 
                model: Category, as: "question_categories" 
            },
            {
              model: User,
              attributes: ['id','username','first_name','last_name'],
            },
            {
              model: Answer,
              attributes: ['id','user_id','question_id','answer_text'],
            }
        ]
    },
    {
        where: {
        id: req.params.id
    }})
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//find a question by text
router.get('/search/:qt', withAuth, (req, res) => {
    Question.findAll({   
        where: {
                question_title: { [Op.like]: `%${req.params.qt}%`}
                },
        include: [
            { 
                model: Category, as: "question_categories" 
            },
            {
              model: User,
              attributes: ['id','username','first_name','last_name'],
            },
            {
              model: Answer,
              attributes: ['id','user_id','question_id','answer_text'],
            }]}
    ).then(dbQuestionData => {
        res.json(dbQuestionData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//find a question by category name
router.get('/search-category/:cn', withAuth, (req, res) => {
    Category.findOne({   
        where: {
                category_name: { [Op.like]: `%${req.params.cn}%`}
                },
        include: [
            { 
                model: Question, as: "question_categories",
                include: [
                    {
                        model: User,
                        attributes: ['id','username','first_name','last_name'],
                      },
                      {
                        model: Answer,
                        attributes: ['id','user_id','question_id','answer_text'],
                      }
                ]
            },
            ]}
    ).then(dbQuestionData => {
        res.json(dbQuestionData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Question.create({
        question_title: req.body.question_title,
        question_text: req.body.question_text,
        user_id: req.session.user_id,
        //category_id: req.body.category_id
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        console.log("question-route file error")
        res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Question.update(
        { 
            question_title: req.body.question_title,
            question_text: req.body.question_text 
        },
        { 
            where: {
            id: req.params.id,
            user_id: req.session.user_id
        }}
    )
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//update question category
router.put('/:id/:category_name', withAuth, (req, res) => {
    Category.findOne({
            where: {
                category_name: req.params.category_name,
                user_id: req.session.id
            },
          })
    .then(dbCategoryData => {
        CategoryQuestion.create({
            question_id: req.params.id,
            category_id: dbCategoryData.id
          })
    }).then(dbQuestionData => {
        res.json(dbQuestionData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//delete question category
router.delete('/:id/:category_name', withAuth, (req, res) => {
    Category.findOne({
        where: {
            category_name: req.params.category_name,
            user_id: req.session.id
        },
      })
    .then(dbCategoryData => {
    CategoryQuestion.destroy({
        where: {
            question_id: req.params.id,
            category_id: dbCategoryData.id
        }
      })
    }).then(dbQuestionData => {
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
            id: req.params.id,
            user_id: req.session.user_id
        },
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;