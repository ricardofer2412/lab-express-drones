const express = require("express");
const router = express.Router();
const Drones = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  console.log("drones");
  Drones.find()
    .then((response) => {
      console.log(response);
      res.render("drones/list", { droneList: response });
    })
    .catch((error) => console.log("error", error));
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
  // Iteration #3: Add a new drone
  // ... your code here
});

router.post("/drones/create", (req, res, next) => {
  Drones.create(req.body)

    .then((newDrone) => {
      console.log("newDrone", newDrone);
      res.redirect("/drones");
    })
    .catch((error) =>
      console.log(
        "An error occurred while saving a drone to the database: ",
        error
      )
    );
});

router.post("/drones/:id/delete", (req, res, next) => {
  console.log("id", req.params.id);
  Drones.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/drones");
    })
    .catch((error) => console.log("delete from db", error));
});

router.get("/drones/:id/edit", (req, res, next) => {
  console.log(req.params.id);
  Drones.findById(req.params.id)
    .then((responseDroneOne) => {
      console.log(responseDroneOne);
      res.render("drones/update-form", responseDroneOne);
    })
    .catch((error) => console.log("An error occurred fetching drone ", error));
});

router.post("/drones/:id/edit", (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  Drones.findByIdAndUpdate(
    req.params.id,
    { name, propellers, maxSpeed },
    { new: true }
  )
    .then((updateDroneFromDB) => {
      console.log(updateDroneFromDB);
      res.redirect("/drones");
    })
    .catch((erro) => console.log(error));
});

module.exports = router;
