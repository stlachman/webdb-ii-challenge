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
  const zoo = req.zoo;
  res.status(200).json(zoo);
});

// UPDATE - PUT /api/zoos/:id
router.put("/:id", validateId, (req, res) => {
  const updatedInfo = req.body;
  const { id } = req.params;
  Zoos.update(updatedInfo, id)
    .then(updatedZoo => {
      res.status(201).json(updatedZoo);
    })
    .catch(err => res.status(500).json({ message: "Error updating zoo" }));
});

// DELETE - DELETE /api/zoos/:id
router.delete("/:id", validateId, (req, res) => {
  Zoos.remove(req.params.id)
    .then(removedZoo => {
      res.status(204).end();
    })
    .catch(err => res.status(500).json({ message: "Error deleting zoo" }));
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
