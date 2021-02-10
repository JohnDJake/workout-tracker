const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "The exercise must have a name"
    },
    type: {
        type: String,
        trim: true,
        enum: ["cardio", "resistance"],
        required: "The exercise type is required"
    },
    weight: Number,
    sets: Number,
    reps: Number,
    duration: {
        type: Date,
        required: true
    },
    distance: {
        type: Number,
        required: [function () { return this.type === "cardio" }, "Cardio exercises must specify a distance"]
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;