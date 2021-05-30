const router= require('express').Router();
const sequelize= require('../config/connection');
const { Answer, Category, CategoryQuestion, Organization, Question, User}= require('../database/tables');

// get all answers for homepage
router.get('/', (req, res) => {
    Question.findAll({
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
                include:{
                    model: Category
                }
            },
            {
                model: User,
                attributes: ['id','username','first_name','last_name'],
            },
        ]
    })
    .then(dbQuestionData => {
        const questions= dbQuestionData.map(question => question.get({plain: true}));

        res.render('homepage', {
            questions,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports= router;