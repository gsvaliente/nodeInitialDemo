import mongoose, { mongo } from 'mongoose';

mongoose.set('strictQuery', false);

const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('DB connected');
  } catch (error) {
    console.log(error, error.message);
    throw new Error('Error while connecting to DB');
  }
};

export { dbConnect };
