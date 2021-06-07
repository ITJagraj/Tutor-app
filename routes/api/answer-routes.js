const router = require('express').Router();
const withAuth = require('../auth');
const {Answer, User} = require('../../database/tables');
var nodemailer = require("nodemailer");

//gets all answers
router.get('/:id', (req, res) => {
    Answer.findAll({
            where: {
              question_id: req.params.id}
            })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log("err occured");
        res.status(500).json(err);
});
});

//create answers on a question
router.post('/', withAuth, (req, res) => {
    Answer.create({
      answer_text: req.body.answer_text,
      user_id: req.session.user_id,
      question_id: req.body.question_id,
      include: [
        {
            model: User,
            attributes: ['id','username','first_name','last_name','email']
        }
    ]
    })
      .then(dbAnswerData => {
      
          var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth:{
              user: 'noreply.coeusshare@yahoo.com',
              pass: 'Tm@23A9$Xy6w'
            }
          });
          console.log(`${req.body.destination_email}`)
          var mailOptions = {
            from: 'noreply.coeusshare@yahoo.com',
            to: `${req.body.destination_email}`,
            subject: `Someone has posted an answer to your question.` ,
            text: `Check it out your answer at https://coeus-share.herokuapp.com/user-page`
          }

          transporter.sendMail(mailOptions, function(err, info)
          {if (err) {console.log(err);}
          else { console.log('Email sent: ' + info.response)}});

        res.json(dbAnswerData)
      })
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
          id: req.params.id,
          user_id: req.session.user_id
      }
    })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;