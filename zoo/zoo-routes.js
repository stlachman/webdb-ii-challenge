const router = require("express").Router();

const Zoos = require("./zoos-model.js");

router.post("/", validateZoo, (req, res) => {
  const zooInfo = req.body;
  Zoos.add(zooInfo)
    .then(zoo => {
      res.status(201).json(zooInfo);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding animal" });
    });
});

router.get("/", (req, res) => {
  Zoos.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json({ message: "Error retrieving zoos" }));
});

function validateZoo(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required field name" });
  } else {
    next();
  }
}

module.exports = router;
