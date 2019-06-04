const router = require("express").Router();

const Zoos = require("./zoos-model.js");

// CREATE - POST /api/zoos
router.post("/", validateZoo, (req, res) => {
  const zooInfo = req.body;
  Zoos.add(zooInfo)
    .then(zoo => {
      res.status(201).json(zooInfo);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding zoo" });
    });
});

// READ - GET /api/zoos
router.get("/", (req, res) => {
  Zoos.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json({ message: "Error retrieving zoos" }));
});

// READ - GET /api/zoos/:id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.zoo);
});

// Middleware
function validateZoo(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required field name" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;
  Zoos.findById(id)
    .then(zoo => {
      if (zoo) {
        req.zoo = zoo;
        next();
      } else {
        res.status(404).json({ message: "No zoo with that id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving zoo" });
    });
}

module.exports = router;
