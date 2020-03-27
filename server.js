const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});
// routing
app.get("/", function(req, res) {
  res.sendFile(path.join(_dirname + "/public/index.html"));
});
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(_dirname + "/public/exercise.html"));
});

// get (find all)
// res = await fetch("/api/workouts");
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// get
// fetch("/api/workouts/range")
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// post
// const res = await fetch("/api/workouts", {
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// put
//const res = await fetch("/api/workouts/" + id, {
// app.put("/api/workouts/:id", ({ body }, res) => {
//   db.Wo;
// });


// app.post("/api/workouts", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(({ _id }) =>
//       db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true })
//     )
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
