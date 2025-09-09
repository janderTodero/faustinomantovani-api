const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const articlesRoutes = require("./src/routes/articlesRoutes")

const app = express();

app.use(cors({
  origin: "https://www.faustinomantovani.com.br",
  credentials: true
}));

app.use(express.json());

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 
  }
}));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));
