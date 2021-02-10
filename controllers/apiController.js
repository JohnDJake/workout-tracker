const express = require("express");

const db = require("../models");

const router = express.Router();

// Get all workouts
router.get("/", (req, res) => db.Workout.find()
    .then(data => res.json(data)).catch(err => res.status(500).json(err)));

// Get workout by id with exercises populated
router.get("/:id", (req, res) => db.Workout.findById(req.params.id).populate("exercises")
    .then(data => res.json(data)).catch(err => res.status(500).json(err)));

// Create a new workout
router.post("/", (req, res) => db.Workout.create(req.body)
    .then(data => res.json(data)).catch(err => res.status(500).json(err)));

// Add exercises to a workout
router.post("/:id", (req, res) =>
    db.Exercise.create(req.body.exercises)
        .then(newExercises => db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: newExercises.map(doc => doc._id) } })
            .then(data => res.json(data)).catch(err => res.status(500).json(err)))
        .catch(err => res.status(500).json(err)));

module.exports = router;