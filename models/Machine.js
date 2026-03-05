const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    lastMaintenanceDate: {
        type: Date,
        required: true
    },
    nextDueDate: {
        type: Date,
        required: true
    },
    maintenanceInterval: {
        type: Number,
        required: true,
        default: 30
    },
    status: {
        type: String,
        enum: ["Active", "Overdue", "Under Maintenance"],
        default: "Active"
    }
});

module.exports = mongoose.model('Machine', machineSchema);