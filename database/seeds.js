const { User, Category, Question, Answer } = require('./tables/index');
const sequelize = require('../config/connection');

const userdata = [
    {
    username: "DreJI95",
    first_name: "Andre" ,
    last_name: "Moseley" ,
    password: "abcd1234" 
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
    }
];

const questiondata = [
    {
        question_title: "How do i initialize a file?",
        question_text: "I do not know how to initialize a file to do algorithimic compares.",
        user_id: "1",
        category_id: ["2"],
        category_id: ["3"]
    }
];

const answerdata = [
    {
        answer_text: "This is how you do it dumb dumb.",
        user_id: "1",
    }
];

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

  process.exit(0);
};

seedAll();
