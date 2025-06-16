const express = require('express');
const app = express();

// (a) Student class with name, grade, and a method getDetails
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }

    getDetails() {
        return `Name: ${this.name}, Grade: ${this.grade}`;
    }
}

const students = [];

// (b) Middleware to parse JSON requests
app.use(express.json());

// (c) POST route to add a student
app.post('/students', (req, res) => {
    const { name, grade } = req.body;

    // Basic validation
    if (!name || grade === undefined) {
        return res.status(400).json({ message: "Name and grade are required" });
    }

    const student = new Student(name, grade);
    students.push(student);
    res.status(201).json({ message: 'Student added successfully', student: student.getDetails() });
});

// (d) GET route to return all students' details
app.get('/students', (req, res) => {
    const allDetails = students.map(student => student.getDetails());
    res.json(allDetails);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
