import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import demoRequestRouter from "./routes/demoRequest";

const PORT = process.env.PORT || 6000;

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/demo-request", demoRequestRouter);
};

bootstrap();
