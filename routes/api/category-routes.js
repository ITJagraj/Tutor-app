const router = require('express').Router();
const {Category, Question} = require('../../database/tables');

//gets all categories
router.get('/', withAuth, (req, res) => {
    Category.findAll({
      
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//find one category for a question
router.get('/:id', withAuth, (req, res) => {
    Category.findOne({
      where: {
          id: req.params.id
      }
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//create categories on a search
router.post('/', withAuth, (req, res) => {
    Category.create({
      category_name: req.body.category_name
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Only developers should be able to delete categories from the tutor app.