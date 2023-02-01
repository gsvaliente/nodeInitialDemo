const mongoose = require('mongoose');

// to remove deprecation Warning
mongoose.set('strictQuery', false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
  } catch (error) {
    console.log(error, error.message);
    throw new Error('Error while connecting to DB');
  }
};

module.exports = { dbConnection };
