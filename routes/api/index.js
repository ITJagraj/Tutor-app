const router = require('express').Router();

const answerRoutes = require('./answer-routes');
const categoryRoutes = require('./category-routes');
const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');

router.use('/answers', answerRoutes);
router.use('/categories', categoryRoutes);
router.use('/questions', questionRoutes);
router.use('/users', userRoutes);

module.exports = router;