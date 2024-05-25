import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // Replace with your React app's origin
    credentials: true, // Include if your API requires cookies for authentication
  })
);

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("connected to the world!");
});
