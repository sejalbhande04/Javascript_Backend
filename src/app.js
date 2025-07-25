import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// for parsing json data in request body
app.use(
  express.json({
    limit: "20kb",
  })
);

// this is for parsing url in encoded format
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

// for serving static files/assets like pdf, images, videos to store on server ex.public folder
app.use(express.static("public"));

// for parsing cookies in request, server se cookies access and set karne ke liye
app.use(cookieParser());

// Importing routes
import userRouter from "./routes/user.routes.js";

// routes declaration
// app.get() - route usi code mai tha isiliye get chal raha tha
// app.use("/users",userRouter)
app.use("/api/v1/users", userRouter);

export default app;
