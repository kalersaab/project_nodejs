const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(express.json());

mongoose
  .connect(
   "mongodb+srv://kaler:mIp0cb9Dzd9bRey3@cluster0.dvnvnj9.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("server app listening on port " + (process.env.PORT || 3000));
});
