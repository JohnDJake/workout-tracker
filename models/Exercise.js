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
    duration: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: function () { return this.type === "resistance" }
    },
    sets: {
        type: Number,
        required: function () { return this.type === "resistance" }
    },
    reps: {
        type: Number,
        required: function () { return this.type === "resistance" }
    },
    distance: {
        type: Number,
        required: function () { return this.type === "cardio" }
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;