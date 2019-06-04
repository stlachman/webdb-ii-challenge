const router = require("express").Router();

const Bears = require("./bears-model.js");

// CREATE - POST /api/bears
router.post("/", validateBear, (req, res) => {
  const newBear = req.body;
  Bears.add(newBear)
    .then(bear => {
      res.status(201).json(newBear);
    })
    .catch(err => res.status(500).json({ message: "Error adding bear" }));
});

// READ - GET /api/bears
router.get("/", (req, res) => {
  Bears.find()
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json({ message: "Error retrieving bears" }));
});

// READ - GET /api/bears/:id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.bear);
});

function validateBear(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required field name" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;
  Bears.findById(id)
    .then(bear => {
      if (bear) {
        req.bear = bear;
        next();
      } else {
        res.status(404).json({ message: "No bear with that id" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving bear" }));
}

module.exports = router;
