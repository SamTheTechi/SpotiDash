const dotenv = require(`dotenv`);
const cookie = require(`cookie-parser`);
const mongoose = require(`mongoose`);
const helmet = require(`helmet`);
const cors = require(`cors`);
const path = require("path");
const express = require(`express`);

dotenv.config();
const port = process.env.PORT || process.env.LOCALPORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

const auth = require(`./routes/auth`);
const api = require(`./routes/api`);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://i.scdn.co"],
    },
  }),
);
app.use(cookie());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use(`/`, auth);
app.use(`/api/v1`, api);

app.use(express.static(path.join(__dirname, "./dist")));

app.get("/*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
});

const Start = async () => {
  try {
    await mongoose.connect(MONGODB_URI),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      };

    console.log(`connected to DB sucessfully`);
  } catch (e) {
    throw e;
  }
  app.listen(port, async () => {
    console.log(`server is running on port ${port}... `);
    console.log(`http://localhost:5000/login`);
  });
};
Start();
