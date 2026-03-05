const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Machine = require('../models/Machine');


// ✅ GET all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('machine');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ CREATE ticket
router.post('/', async (req, res) => {
  try {
    const { machine, issue } = req.body;

    if (!machine || !issue) {
      return res.status(400).json({ message: "Machine and issue required" });
    }

    const ticket = new Ticket({
      machine,
      issue,
      status: "Open"
    });

    await ticket.save();

    const machineDoc = await Machine.findById(machine);
    if (machineDoc) {
      machineDoc.status = "Under Maintenance";
      await machineDoc.save();
    }

    res.json(ticket);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ✅ CLOSE ticket
router.put('/:id/close', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    await ticket.save();

    const machine = await Machine.findById(ticket.machine);

    if (machine) {
      machine.lastMaintenanceDate = new Date();

      const interval = machine.maintenanceInterval || 30;
      machine.nextDueDate =
        new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

      machine.status = "Active";
      await machine.save();
    }

    res.json({ message: "Maintenance completed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;