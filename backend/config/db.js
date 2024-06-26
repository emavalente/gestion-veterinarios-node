import mongoose from "mongoose";

const dbConection = async () => {
  try {
    const DB = await mongoose.connect(process.env.MDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${DB.connection.host}:${DB.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConection;
