const express = require("express");
const utvonal = require("./backend/routes/utvonal");
const passport = require("passport");
const passportBeallitas = require("./backend/src/passport");
const mongoose = require("mongoose");
const mongoDbStore = require("connect-mongo");
const session = require("express-session");
const { urlencoded } = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");
const flash = require("express-flash");

const PORT = process.env.PORT || 3000;
const adatbazisString =
  "mongodb+srv://tamas22:Kayser22@cinkom.qwnw8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
console.log(__dirname);
app.use(
  session({
    secret: "HkoixjvcfvbhgnveFGevgfqtzujnf",
    resave: false,
    saveUninitialized: false,
    store: mongoDbStore.create({
      mongoUrl: adatbazisString,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

passportBeallitas.inicializálás(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(flash());
app.use(express.static("./frontend"));
app.use(utvonal);

mongoose.connect(
  adatbazisString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Csatlakozva az adatbázishoz");
    } else {
      console.log(`Hiba: ${err}`);
    }
  }
);

const szerver = app.listen(PORT, () => {
  console.log(`A köv. porton fut: ${PORT}`);
});
