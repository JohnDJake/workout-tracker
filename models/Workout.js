const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        default: Date.now
    },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;