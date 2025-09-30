// Employee Management CLI using Node.js

const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array to store employees
let employees = [];

// Show main menu
function showMenu() {
    console.log("\n=== Employee Management System ===");
    console.log("1. Add Employee");
    console.log("2. List Employees");
    console.log("3. Remove Employee");
    console.log("4. Exit");

    rl.question("Enter your choice: ", function(choice) {
        handleChoice(choice);
    });
}

// Handle menu choice
function handleChoice(choice) {
    switch(choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice! Try again.");
            showMenu();
    }
}

// Add a new employee
function addEmployee() {
    rl.question("Enter Employee ID: ", function(id) {
        // Check if ID already exists
        const exists = employees.find(emp => emp.id === id);
        if (exists) {
            console.log("Employee ID already exists!");
            showMenu();
        } else {
            rl.question("Enter Employee Name: ", function(name) {
                employees.push({ id: id, name: name });
                console.log(`Employee ${name} added successfully!`);
                showMenu();
            });
        }
    });
}

// List all employees
function listEmployees() {
    console.log("\n=== Employee List ===");
    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}`);
        });
    }
    showMenu();
}

// Remove an employee by ID
function removeEmployee() {
    rl.question("Enter Employee ID to remove: ", function(id) {
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            const removed = employees.splice(index, 1);
            console.log(`Employee ${removed[0].name} removed successfully!`);
        } else {
            console.log("Employee not found!");
        }
        showMenu();
    });
}

// Start the CLI
showMenu();
