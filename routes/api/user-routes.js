const router = require('express').Router();
const withAuth = require('../auth');
const { User } = require('../../database/tables');

//GET /api/users
router.get('/', withAuth, (req, res) => {
    if (req.session.user_id === req.params.id) {
        User.findAll({
            attributes: {
                include: ['createdAt',
                'updatedAt'],
                exclude: ['password']
            }
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

//GET user by username
router.get('/:username', /*withAuth,*/ (req, res) => {
    console.log("test1");
    User.findOne({
        where: {
            username: req.params.username
        },
        attributes: {
            exclude: ['password'],
        }
    })
        .then(dbUserData => {
            console.log("test2");
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET /api/users/1
// router.get('/:id', withAuth, (req, res) => {
//     if (req.session.user_id === req.params.id) {
//         User.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: {
//                 include: ['createdAt',
//                 'updatedAt'],
//                 exclude: ['password'],
//             }
//         })
//             .then(dbUserData => {
//                 if (!dbUserData) {
//                     res.status(404).json({ message: 'No user found with this id' });
//                     return;
//                 }
//                 res.json(dbUserData);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     }
// });

//POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = false;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({message: 'No user found with this username'});
                return;
            }
            const validPassword= dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({message: 'Incorrect password!'});
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);

                res.json({user: dbUserData, message: 'You are now logged in!'});
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

//PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    if (req.session.user_id === req.params.id) {

        User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            },
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                req.session.save(() => {
                    req.session.loggedIn = false;
                    res.json(dbUserData);
                });
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    if (req.session.user_id === req.params.id) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;
