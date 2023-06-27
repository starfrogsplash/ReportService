import express from "express";
import { json } from "body-parser";
import cors from 'cors';
import { userRouter } from "./routes/userRouter";
import { reportRouter } from "./routes/reportRouter";
import cookieParser from "cookie-parser";

const app = express();
app.use(json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  next();
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(userRouter)
app.use(reportRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});


export { app }