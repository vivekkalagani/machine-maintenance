const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Machine = require("../models/Machine"); // 🔥 Import Machine model


// ============================
// CREATE TASK
// ============================
router.post("/", async (req, res) => {
  try {
    const { machineId, taskName, scheduledDate } = req.body;

    const task = new Task({
      machineId,
      taskName,
      scheduledDate
    });

    await task.save();

    // 🔥 When task is created → set machine to Under Maintenance
    await Machine.findByIdAndUpdate(machineId, {
      status: "Under Maintenance"
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ============================
// GET ALL TASKS
// ============================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("machineId");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ============================
// UPDATE TASK (Complete Task)
// ============================
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // 🔥 If task marked completed → set machine Active
    if (req.body.status === "completed") {
      await Machine.findByIdAndUpdate(task.machineId, {
        status: "Active"
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;