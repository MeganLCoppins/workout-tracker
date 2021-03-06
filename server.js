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
// html routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
// api routes
// get route(find all)
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

// get route
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

// post route
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

// put route
// const res = await fetch("/api/workouts/" + id, {
app.put("/api/workouts/:id", (req, res) => {

    db.Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push:{exercises: req.body }
        }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
