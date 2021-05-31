const { User, Category, Question, Answer, CategoryQuestion } = require('./tables/index');
const sequelize = require('../config/connection');

const userdata = [
    {
        username: "DreJI95",
        first_name: "Andre" ,
        last_name: "Moseley" ,
        password: "abcd1234" 
    },
    {
        username: "DreKM85",
        first_name: "Andrew" ,
        last_name: "Moses" ,
        password: "2d4b1a3c" 
    }
];

const categorydata = [
    {
        category_name: "C"
    },
    {
        category_name: "JavaScript"
    },
    {
        category_name: "Python"
    },
    {
        category_name: "Ruby"
    },
    {
        category_name: "Ruby"
    },
];

const questiondata = [
    {
        question_title: "How do i initialize a file?",
        question_text: "I do not know how to initialize a file to do algorithimic compares.",
        user_id: 1
    },
    {
        question_title: "How do i delete a file?",
        question_text: "I do not know how to delete a file.",
        user_id: 1
    }
];

const answerdata = [
    {
        answer_text: "This is how you do it silly goose.",
        user_id: 1,
        question_id: 1
    },
    {
        answer_text: "This is why you don't it pupil.",
        user_id: 2,
        question_id: 1
    }
];

const questioncategorydata = [
    {
        question_id: 1,
        category_id: 2
    },
    {
        question_id: 1,
        category_id: 3
    },
    {
        question_id: 2,
        category_id: 3
    }
]

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await User.bulkCreate(userdata)
  console.log('--------------');

  await Category.bulkCreate(categorydata);
  console.log('--------------');

  await Question.bulkCreate(questiondata);
  console.log('--------------');

  await Answer.bulkCreate(answerdata);
  console.log('--------------');

  await CategoryQuestion.bulkCreate(questioncategorydata);
  console.log('--------------');
    
  process.exit(0);
};

seedAll();
