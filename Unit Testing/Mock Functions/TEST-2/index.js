const express = require("express");
const app = express();

app.use(express.json());

let employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager' },
    { id: 3, name: 'Sam Johnson', position: 'Designer' }
  ];


function getAllEmployees(){
    return employees;
}  

function getEmployeeById(id){
    return employees.find((emp) => emp.id === id);
}

function addEmployee(employee){
    employees.push(employee);
    return employee;
}

app.get("/api/employees", (req, res) => {
   const employees = getAllEmployees();
   return res.status(200).json(employees);
});

app.get("/api/employess/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if(!employee){
    return res.status(404).json({ error: "Employee not found." });
  }
  res.status(200).json(employee);
});

app.post("/api/employess/new", (req, res) => {
   let employeeId = parseInt(req.query.employeeId); 
   let name = req.query.name;
   let position = req.query.position;
   let addedEmployee = addEmployee({ employeeId, name, position });
   res.status(201).json(addedEmployee);
});

module.exports = { app, getAllEmployees, getEmployeeById, addEmployee };