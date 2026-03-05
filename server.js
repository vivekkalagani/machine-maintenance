const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/machineMaintenance')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ✅ Routes
app.use('/api/machines', require('./routes/machineRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// ✅ NEW TASK ROUTE (ADD THIS LINE)
app.use('/api/tasks', require('./routes/taskRoutes'));


// Test Route
app.get('/', (req, res) => {
    res.send("Machine Maintenance API Running...");
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});