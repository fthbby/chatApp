const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successful!");
  })
  .catch((err) => {
    console.log("DB not connected", err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
