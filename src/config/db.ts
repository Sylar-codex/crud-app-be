import mongoose, { ConnectOptions } from "mongoose";
import "colors";

mongoose.set("strictQuery", true);

// Define function types explicitly
export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    const options: ConnectOptions = {
      retryWrites: true,
      w: "majority",
      appName: process.env.NODE_ENV || "production",

      // Connection pooling
      maxPoolSize: 10,
      minPoolSize: 2,

      // Timeout settings
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
    };

    await mongoose.connect(mongoUri, options);

    switch (process.env.NODE_ENV) {
      case "development":
        console.log("Development database connected".blue);
        break;
      case "production":
        console.log("Production database connected".blue);
        break;
      default:
        console.log("Database connected".blue);
    }

    // Connection events
    mongoose.connection.on("error", (err: Error) => {
      console.error("MongoDB connection error:".red, err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected".yellow);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination".yellow);
      process.exit(0);
    });
  } catch (error) {
    const err = error as Error;
    console.error("Database connection failed:".red, err.message);
    process.exit(1);
  }
};

export const closeDatabase =
  process.env.NODE_ENV === "development"
    ? async (): Promise<void> => {
        try {
          await mongoose.connection.dropDatabase();
          console.log("Database dropped successfully".yellow);
          await mongoose.disconnect();
          console.log("Database connection closed".yellow);
        } catch (error) {
          console.error("Error dropping database:".red, error);
        }
      }
    : (): never => {
        throw new Error("Database drop function not available in production");
      };

export const clearDatabase =
  process.env.NODE_ENV === "development"
    ? async (): Promise<void> => {
        try {
          const collections = mongoose.connection.collections;

          for (const key of Object.keys(collections)) {
            await collections[key].deleteMany({});
            console.log(`Cleared all documents from ${key} collection`.cyan);
          }

          console.log("All collections cleared successfully".rainbow);
        } catch (error) {
          console.error("Error clearing database:".red, error);
        }
      }
    : (): never => {
        throw new Error("Database clear function not available in production");
      };
