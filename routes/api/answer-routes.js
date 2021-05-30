const router = require('express').Router();
const withAuth = require('../auth');
const {Answer} = require('../../database/tables');

//gets all answers
router.get('/', withAuth, (req, res) => {
    Answer.findAll({
      
    })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//create answers on a question
router.post('/', withAuth, (req, res) => {
    Answer.create({
      answer_text: req.body.answer_text,
      user_id: req.body.user_id,
      question_id: req.body.question_id
    })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Users should not be able to edit/update their answers.

//delete answer on a question
router.delete('/:id', withAuth, (req, res) => {
    Answer.destroy({
      where: {
          id: req.params.id
      }
    })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;