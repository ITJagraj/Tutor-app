const router= require('express').Router();
const sequelize= require('../config/connection');
const { Question, Answer, User,Category, CategoryQuestion } = require('../database/tables');
const { Op } = require('sequelize');

router.get('/login', (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/add-question', (req, res) => {
    res.render('addQuestionPage', { loggedIn: req.session.loggedIn, userName: req.session.username } );
});

router.get('/edit-question/:id', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: ['id','user_id','question_id','answer_text','createdAt'],
                include:[
                    {
                        model: User,
                        attributes: ['id','username'],
                    }
                ]
            }
        ]
    })
    .then(dbQuestionData => {
        if (!dbQuestionData) {
            res.status(404).json({message: 'No question found with this id'});
            return;
        }

        const question = dbQuestionData.get({plain: true});

        res.render('editQuestionPage', {
            question,
            loggedIn: req.session.loggedIn,
            userId: req.session.user_id,
            userName: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET user by username
router.get('/user-page', (req, res) => {
    User.findOne({
        where: {
            username: req.session.username
        },
        attributes: {
            exclude: ['password'],
        },
        include: [
            {
                model: Question,
                attributes: ['id','question_title','question_text','createdAt']
            },
            {
                model: Answer,
                attributes: ['id','user_id','question_id','answer_text','createdAt'],
                include:[
                    {
                        model: Question,
                        attributes: ['id','question_title','question_text'],
                    }
                ]
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }

            const userInfo = dbUserData.get({plain: true});

            res.render('showUserPage', {
                userInfo,
                loggedIn: req.session.loggedIn,
                userId: req.session.user_id,
                userName: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
            loggedIn: req.session.loggedIn,
            userName: req.session.username,
            userId: req.session.user_id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/foundQuestions/:qt', (req, res) => {
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
        ],
        where: {
            question_title: { [Op.like]: `%${req.params.qt}%`}
            },
    })
    .then(dbQuestionData => {
        const questions= dbQuestionData.map(question => question.get({ plain: true}));

        res.render('homepage', {
            questions,
            loggedIn: req.session.loggedIn,
            userName: req.session.username,
            userId: req.session.user_id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single question
router.get('/question/:id', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: ['id','user_id','question_id','answer_text','createdAt'],
                include:[
                    {
                        model: User,
                        attributes: ['id','username'],
                    }
                ]
            }
        ]
    })
    .then(dbQuestionData => {
        if (!dbQuestionData) {
            res.status(404).json({message: 'No question found with this id'});
            return;
        }

        const question = dbQuestionData.get({plain: true});

        res.render('showQuestionPage', {
            question,
            loggedIn: req.session.loggedIn,
            userId: req.session.user_id,
            userName: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports= router;