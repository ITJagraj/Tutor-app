const router = require('express').Router();
const {Category, Question} = require('../../database/tables');

//gets all categories
router.get('/', (req, res) => {
    Category.findAll({
      
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//
router.get('/:id', (req, res) => {
    Category.findAll({
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