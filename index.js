const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect('mongodb://localhost/recipe-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

  }).then(self => {
    // console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log('connection succesfull')
    updateDataBase();

  }).catch(error => {
    console.error('Error connecting to the database', error);
  });



async function updateDataBase() {
  try { 
  let recipeOne = await Recipe.create({
    title: 'pasta al pomodoro',
    level: 'Easy Peasy',
    ingridients: ['tomatoes', 'pasta', 'garlic', 'parmesan'],
    cuisine: 'italian',
    dishType: 'https://static.cookist.it/wp-content/uploads/sites/21/2017/10/penne-al-sugo-di-pomodoro.jpg',
    duration: 20,
    creator: 'God',
    created: '' //dont know
  })

  console.log(recipeOne.title);


  let theRecipes = await Recipe.insertMany([{
      "title": "Asian Glazed Chicken Thighs",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    },
    {
      "title": "Orange and Milk-Braised Pork Carnitas",
      "level": "UltraPro Chef",
      "ingredients": [
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
        "1 tablespoon kosher salt, or more to taste",
        "2 tablespoons vegetable oil",
        "2 bay leaves",
        "2 teaspoons ground cumin",
        "1 teaspoon dried oregano",
        "1/4 teaspoon cayenne pepper",
        "1 orange, juiced and zested"
      ],
      "cuisine": "American",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
      "duration": 160,
      "creator": "Chef John"
    },
    {
      "title": "Carrot Cake",
      "level": "Amateur Chef",
      "ingredients": [
        "6 cups grated carrots",
        "1 cup brown sugar",
        "1 cup raisins",
        "4 eggs",
        "1 1/2 cups white sugar",
        "1 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup crushed pineapple, drained",
        "3 cups all-purpose flour",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon salt",
        "4 teaspoons ground cinnamon"
      ],
      "cuisine": "International",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      "duration": 130,
      "creator": "Chef Nadia"
    },
    {
      "title": "Rigatoni alla Genovese",
      "level": "Easy Peasy",
      "ingredients": [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      "duration": 220,
      "creator": "Chef Luigi"
    },
    {
      "title": "Chocolate Chip Cookies",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
        "2 cups semisweet chocolate chips"
      ],
      "cuisine": "French",
      "dishType": "dessert",
      "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
      "duration": 30,
      "creator": "Chef Jennifer"
    }
  ])

  theRecipes.forEach((e) => {
    console.log(e.title);
  })

 await Recipe.updateOne (
   {title: "Rigatoni alla Genovese"}, {duration: 100}
 );

 console.log('recepie updated')

 await Recipe.findOneAndDelete({title: "Carrot Cake"});

 console.log('carrot cake has been deleted');

  } catch (e) {
    console.log('error');
}
finally {
mongoose.connection.close();
}

}