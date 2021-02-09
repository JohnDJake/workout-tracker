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
        enum: ["cardio", "strength"],
        required: "The exercise type is required"
    },
    weight: {
        type: Number,
        min: 0,
        default: 0
    },
    sets: {
        type: Number,
        min: 1,
        default: 1
    },
    reps: {
        type: Number,
        min: 1,
        default: 1
    },
    duration: {
        type: Date
    },
    distance: {
        type: Number,
        required: [function () { return this.type === "cardio" }, "Cardio exercises must specify a distance"]
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;