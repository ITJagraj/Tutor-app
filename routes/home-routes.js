const router= require('express').Router();
const sequelize= require('../config/connection');
const { Question, Answer, User,Category, CategoryQuestion } = require('../database/tables');

// needs some adjustments on login apis where to direct and use if user is "logged in or not"
router.get('/login', (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn });
});
router.get('/post', (req, res) => {
    res.render('dashboard', { loggedIn: req.session.loggedIn } );
});
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
    })
    .then(dbQuestionData => {
        const questions= dbQuestionData.map(question => question.get({ plain: true}));

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