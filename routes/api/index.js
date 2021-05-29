const router = require('express').Router();

const questionRoutes = require('./question-routes.js');


router.use('/questions', questionRoutes);


module.exports = router;