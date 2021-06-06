const router = require('express').Router();
const withAuth = require('../auth');
const {Category} = require('../../database/tables');
const { Sequelize } = require('sequelize');

//gets all categories
router.get('/', withAuth, (req, res) => {
    Category.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category_name')), 'category_name' ]]
      /* reference: https://stackoverflow.com/questions/50673653/sequelize-fn-distinct-value-does-not-give-all-the-columns-for-the-criteria */
      //used to show single category names
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//find one category for a question
router.get('/:category_name', withAuth, (req, res) => {
    Category.findOne({
      where: {
        category_name: reg.params.category_name
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
router.delete('/:category_name', withAuth, (req, res) => {
  Category.destroy({
   where: {
    category_name: req.params.category_name
   }
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;