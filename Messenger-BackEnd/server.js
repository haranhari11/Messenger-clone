// import dependencies
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoMessages from "./messageModel.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1088059",
  key: "9e5a6ca9728ba0707d11",
  secret: "9b63183b338c321ac047",
  cluster: "ap2",
  useTLS: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://admin:VbmOAzLPoDricHs3@cluster0.cmdgj.mongodb.net/messengerdb?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");

  const changeStream = mongoose.connection.collection("messages").watch();
  changeStream.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      change: change,
    });
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/save/message", (req, res) => {
  const dbMessage = req.body;

  mongoMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/conversation", (req, res) => {
  mongoMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listenning... on localhost:${port}`));
