// import dependencies
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

// dotenv file config
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cors());

// db config
const dbName = process.env.dbName
const dbPassword = process.env.dbPassword
const mongoURI = `mongodb+srv://client_user:${dbPassword}@merntipcalcmongodb.ui37z.gcp.mongodb.net/${dbName}>?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.createConnection(mongoURI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connection.once("open", () => {
  console.log("DB connected !!! Yippe <3");
});

// api routes
app.get("/", (req, res) => {
  res.status(200).send("hello World");
});

app.post("/api/v1/calculateTip", (req, res) => {
  const amount = parseInt(req.body.amount);
  const percentage = parseInt(req.body.percentage);

  const toBePayed = (percentage / 100) * amount;

  res.status(200).json({ toBePayed });
});

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
