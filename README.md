# Machine Maintenance Scheduler

## Project Overview

The Machine Maintenance Scheduler is a web-based application designed to manage machines and track their maintenance activities. It helps organizations monitor machine status, schedule maintenance tasks, and record issue tickets to prevent unexpected machine failures.

The system allows users to add machines, track their details, and create maintenance tickets when issues occur.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* JavaScript
* REST APIs
* HTML, CSS (Frontend)

---

## Features

* Add and manage machines
* View machine details
* Create maintenance tickets for machine issues
* Track machine maintenance status
* REST API based backend system

---

## Project Architecture

The project follows a **Client-Server Architecture** with REST APIs.

Frontend (HTML / JavaScript) → Sends requests → Node.js & Express Server → MongoDB Database

---

## Folder Structure

```
machine-maintenance-scheduler
│
├── models
│   ├── Machine.js
│   └── Ticket.js
│
├── routes
│   ├── machineRoutes.js
│   └── ticketRoutes.js
│
├── public
│   ├── machines.html
│   └── tickets.html
│
├── server.js
└── package.json
```

---

## Setup Instructions

### 1 Install Node.js

Download and install Node.js from the official website.

### 2 Install MongoDB

Install MongoDB and start the MongoDB service.

### 3 Install Project Dependencies

```
npm install
```

### 4 Start the Server

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## API Endpoints

### Machines

POST /machines
Add a new machine

GET /machines
Retrieve all machines

---

### Tickets

POST /tickets
Create a new issue ticket

GET /tickets
Retrieve all tickets

---

## Example JSON (Add Machine)

```
{
  "name": "CNC Machine",
  "location": "Plant 1",
  "status": "Active"
}
```

---

## Example JSON (Create Ticket)

```
{
  "machineId": "<Machine ObjectId>",
  "issue": "Overheating problem",
  "status": "Open"
}
```

---

## Future Improvements

* Automatic maintenance scheduling
* Email notifications for maintenance alerts
* Dashboard with maintenance statistics
* Predictive maintenance using machine learning

---

## Author

Vivek Kalagani
