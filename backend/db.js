const mongoose = require('mongoose');


//connecting to the database

const mongoURI = 'mongodb+srv://hussainsiddique0786:Chand2001@cluster0.ejgtd7e.mongodb.net/gofoodmern?retryWrites=true&w=majority'

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    let fetched_data = mongoose.connection.db.collection("food_items");
    let data = await fetched_data.find({}).toArray()
      .catch(err => console.error('Error fetching data from food_items:', err));

    const foodCategory = mongoose.connection.db.collection("food_category");
    const catData = await foodCategory.find({}).toArray()
      .catch(err => console.error('Error fetching data from food_category:', err));

    global.food_items = data;
    global.food_category = catData;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};




module.exports = mongoDB;





















// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Connected to MongoDB');
//     const fetch_data = await mongoose.connection.db.collection("food_items");
//     fetch_data.find({}).toArray(function(err,data){
//       if(err) console.log(err);
//       else console.log(data);
//     })
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }


//second method
// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB: ' + error);
//   });

// module.exports=mongoDB();
