const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => createOne())
  .then(() => createMany())
  .then(() => findOne())
  .then(() => deleteOne())
  .then(() => closeConnection())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const rissotto = {
  title: 'Portobello Rissotto',
  level: 'Amateur Chef',
  ingredients: '50g dried porcini mushrooms, 1 vegetable stock cube, 2 tbsp olive oil, 1 onion, finely chopped, 2 garlic cloves, finely chopped, 250g pack chestnut mushrooms, chopped, 300g risotto rice, such as arborio, 1 x 175ml glass white wine, 25g butter, handful parsley leaves, chopped, 50g parmesan or Grana Padano, freshly grated',
  cuisine: 'Italian',
  dishType: 'main_course',
  image: 'https://cupfulofkale.com/wp-content/uploads/2020/05/Creamy-Vegan-Wild-Mushroom-Risotto-683x1024.jpg.webp',
  duration: 40,
  creator: 'Pablo Gonzalez T' 
}

const createOne = async () => {
  try{
    const risso = await Recipe.create(rissotto)
    console.log('Rissotto:', risso)
  } catch(err) {
    console.log(err)
  }
}

const createMany = async () => {
  try{
    const many = await Recipe.insertMany(data)
    many.forEach(recipe => {
      console.log(recipe.title)})
  } catch(err) {
    console.log(err)
  }
}

const findOne = async () => {
  try {
    const find = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    console.log(find.title, find.duration)
  } catch(err) {
    console.log(err)
  }
}

const deleteOne = async () => {
  try {
    const deleted = await Recipe.findOneAndDelete({title: 'Carrot Cake'})
    console.log('data deleted:', deleted.title)
  } catch(err) {
    console.log(err)
  }
}

const closeConnection = async () => {
  try {
    const closeConnection = await mongoose.connection.close()
  } catch(err) {
    console.log(err)
  }
}



