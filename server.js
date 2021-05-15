const express = require("express");
const cors = require("cors");
const isMutant = require("./isMutant.js");
const app = express();
require("./db");
const Mutant = require("./model");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/mutants", (req, res) => {
  if (!req.body.dna) return res.sendStatus(400);

  const { dna } = req.body;
  try {
    const result = isMutant(dna);
    Mutant.create({ dna, isMutant: result })
      .then((data) => {
        if (result) return res.sendStatus(200);
        else return res.sendStatus(403);
      })
      .catch((err) => res.status(400).json(err.message));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.get("/stats", (req, res) => {
  return Promise.all([
    Mutant.countDocuments({ isMutant: true }),
    Mutant.countDocuments({ isMutant: false }),
  ])
    .then((data) => {
      const [mutants, humans] = data;

      res.status(200).json({
        count_mutant_dna: mutants,
        count_human_dna: humans,
        ratio: mutants / humans,
      });
    })
    .catch((err) => res.status(400).json(err.message));
});
app.get("/results", (req, res) => {
  return Mutant.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(400).json(err.message));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

module.exports = app;
