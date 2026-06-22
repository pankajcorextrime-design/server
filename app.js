const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const express = require("express");
const app = express();
const DB = require("./dbconnect/connectdb");
const userRoute = require("./route/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 7777;

app.use(cookieParser());
app.use(express.json()); // Important for req.body
// app.use(cors());
app.use(
  cors({
    origin: "https://shopingi.netlify.app/", // React Vite
    // origin: "http://localhost:3000", // React CRA
    credentials: true,
  }),
);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello mern");
});
DB().then(() => {
  console.log("MongoDB Connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// http://127.0.0.1:7777/users
// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/users
// http://localhost:7777