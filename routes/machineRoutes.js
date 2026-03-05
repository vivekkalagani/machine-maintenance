const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');
const Task = require('../models/Task');   // ✅ NEW

// ✅ Get all machines (AUTO STATUS CHECK BASED ON TASKS + DUE DATE)
router.get('/', async (req, res) => {
    try {
        const machines = await Machine.find();
        const today = new Date();

        for (let machine of machines) {

            // 🔥 Check if machine has any pending task
            const pendingTask = await Task.findOne({
                machineId: machine._id,
                status: "pending"
            });

            if (pendingTask) {
                machine.status = "Under Maintenance";
            }
            else if (machine.nextDueDate && new Date(machine.nextDueDate) <= today) {
                machine.status = "Overdue";
            }
            else {
                machine.status = "Active";
            }

            await machine.save();
        }

        res.json(machines);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Add new machine
router.post('/', async (req, res) => {
    try {
        const machine = new Machine(req.body);

        const today = new Date();
        if (machine.nextDueDate && new Date(machine.nextDueDate) <= today) {
            machine.status = "Overdue";
        } else {
            machine.status = "Active";
        }

        await machine.save();
        res.json(machine);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// ✅ Get overdue machines
router.get('/due', async (req, res) => {
    try {
        const today = new Date();

        const machines = await Machine.find({
            nextDueDate: { $lte: today }
        });

        res.json(machines);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Get upcoming machines (within 7 days)
router.get('/upcoming', async (req, res) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const machines = await Machine.find({
            nextDueDate: { $gt: today, $lte: nextWeek }
        });

        res.json(machines);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Update maintenance manually
router.put('/updateDue/:id', async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);

        if (!machine) {
            return res.status(404).json({ message: "Machine not found" });
        }

        const today = new Date();
        machine.lastMaintenanceDate = today;

        const interval = machine.maintenanceInterval || 30;
        machine.nextDueDate =
            new Date(today.getTime() + interval * 24 * 60 * 60 * 1000);

        machine.status = "Active";

        await machine.save();

        res.json({ message: "Maintenance updated", machine });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Delete Machine
router.delete('/:id', async (req, res) => {
    try {
        const machine = await Machine.findByIdAndDelete(req.params.id);

        if (!machine) {
            return res.status(404).json({ message: "Machine not found" });
        }

        res.json({ message: "Machine deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Get single machine by ID
router.get('/:id', async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Update maintenance record (Alternative route)
router.put("/:id/update-maintenance", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const today = new Date();
    machine.lastMaintenanceDate = today;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + machine.maintenanceInterval);
    machine.nextDueDate = nextDate;

    machine.status = "Active";

    await machine.save();

    res.json(machine);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;