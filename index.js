const express = require('express');
const app = express();
const students = [];

app.use(express.json());


class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }
  getDetails() {
    return `Name: ${this.name}, Grade: ${this.grade}`;
  }
}

app.post('/students', (req, res) => {
  const data = req.body;

  if (Array.isArray(data)) {
    // If an array of students
    const addedStudents = [];

    for (const item of data) {
      const { name, grade } = item;
      if (!name || grade === undefined) {
        return res.status(400).json({ message: 'Each student must have name and grade' });
      }
      const student = new Student(name, grade);
      students.push(student);
      addedStudents.push(student.getDetails());
    }
    return res.status(201).json({ message: 'Students added', addedStudents });
  } else {
    // Single student object
    const { name, grade } = data;
    if (!name || grade === undefined) {
      return res.status(400).json({ message: 'Name and grade are required' });
    }
    const student = new Student(name, grade);
    students.push(student);
    return res.status(201).json({ message: 'Student added', student: student.getDetails() });
  }
});

app.get('/students', (req, res) => {
  const details = students.map((s) => s.getDetails());
  res.json(details);
});

app.listen(3000, () => console.log('Server started on port 3000'));
