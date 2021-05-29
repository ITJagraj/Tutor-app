const router = require('express').Router();
<<<<<<< HEAD
=======
const session = require('express-session');
>>>>>>> b671ae41b2c9f4d692ca422dbab75af130abc82a
const withAuth = require('../../auth');
const { User } = require('../../models');

//GET /api/users/1
router.get('/:id', withAuth, (req, res) => {
<<<<<<< HEAD
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password'],

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
=======

    if (req.session.id === req.params.id) {

        User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password'],

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
>>>>>>> b671ae41b2c9f4d692ca422dbab75af130abc82a
});



// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
<<<<<<< HEAD
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
=======

    if (req.session.id === req.params.id) {

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


//POST /api/user/1

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
>>>>>>> b671ae41b2c9f4d692ca422dbab75af130abc82a
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

<<<<<<< HEAD
=======

//PUT /api/user

router.put('/:id', (req, res) => {

    if (req.session.id === req.params.id) {


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






>>>>>>> b671ae41b2c9f4d692ca422dbab75af130abc82a
module.exports = router;
