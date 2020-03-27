const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
    type: {
      type: String,
      required: true},
    name: {
      type:String,
      required:true},
    weight: Number,
    sets: Number,
    reps: Number,
      duration:{ 
        type:Number,
      required:true}
  }
]
});
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;