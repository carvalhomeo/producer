import { Kafka, logLevel } from "kafkajs";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // process.env.ORIGIN

const server = http.createServer(app);
const socket = new Server(server);

socket.on("connect", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("location", async (data) => {
    console.log("location from mobile", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING ON PORT ", process.env.PORT);
});

// const kafka = new Kafka({
//   brokers: [process.env.BROKERS],
//   ssl: true,
//   sasl: {
//     mechanism: "plain",
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD,
//   },
//   logLevel: logLevel.NOTHING,
// });

// const producer = kafka.producer();

// app.get("/start/:id", async (req, res) => {
//   console.log(req.params.id);
//   await producer.connect();
//   await producer.send({
//     topic: "path",
//     messages: [{ value: req.params.id }],
//   });
//   await producer.disconnect();
//   res.status(200).send({ product: req.params.id });
// });

// io.on("connect", (socket) => {
//   console.log("user connected: ", socket.id);

//   socket.on("start", async (data) => {
//     console.log("args", data);
//   });
// });

// app.listen(process.env.PORT, () => {
//   console.log("SERVER RUNNING ON PORT ", process.env.PORT);
// });
