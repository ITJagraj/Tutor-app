const router = require('express').Router();
const withAuth = require('../auth');
const {Category} = require('../../database/tables');
const { Sequelize } = require('sequelize');

//gets all categories
router.get('/', withAuth, (req, res) => {
    Category.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category_name')), 'category_name' ]]
      /* reference: https://stackoverflow.com/questions/50673653/sequelize-fn-distinct-value-does-not-give-all-the-columns-for-the-criteria */
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
router.delete('/:id', withAuth, (req, res) => {
  Category.destroy({
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

module.exports = router;