const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true
    },
    exercises: [{ type: mongoose.Schema.Types.ObjectId }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;