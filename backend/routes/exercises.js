const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(() => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((err, doc) => {
      if (err || !doc) {
        res.json({ Msg: "Exercise deleted", err: err, doc: doc });
      } else {
        res.json({ Msg: "Exercise deleted", err: err, doc: doc });
      }
    })

    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (req.body.username) {
        exercise.username = req.body.username;
      }
      if (req.body.description) {
        exercise.description = req.body.description;
      }
      if (req.body.duration) {
        exercise.duration = Number(req.body.duration);
      }
      if (req.body.date) {
        exercise.date = Date.parse(req.body.date);
      }

      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch(err => res.json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
