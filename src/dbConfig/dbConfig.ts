import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // The exclamation mark (!) is the non-null assertion operator, meaning TypeScript will assume MONGO_URI is always defined
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error. Please make sure MongoDb is running." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something gone wrong!");
    console.log(error);
  }
}
