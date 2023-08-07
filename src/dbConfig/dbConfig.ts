import mongoose from "mongoose";

//? Create a function to connect to mongodb using mongoose?

const connectToMongo = async () => {
  const uri = process.env.MONGO_URI!;
  try {
    mongoose.connect(uri);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectToMongo;
