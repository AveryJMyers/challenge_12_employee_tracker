
const db = require('./db/connection');;
const inquirer = require('inquirer');


// gives user options
function mainMenu(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'initQuestion',
            choices: [
            'View All Departments',
            'View All Roles', 
            'View All Employees', 
            'Add a Department', 
            'Add a Role', 
            'Add an Employee', 
            'Update an Employee Role',
            'Exit'
            ]
        },
    ])
    //responds based off user input
    .then((response) => { 
        switch (response.initQuestion) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addADepartment();
                break;
            case 'Add a Role':
                addARole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
            default:
                console.log('Error');
                mainMenu();
        }
    })
}

mainMenu();

// Uses SQL to retrieve all departments

function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};

// Uses SQL to retrieve all roles

function viewAllRoles(){
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id ', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};

// Uses SQL to retrieve all employees
function viewAllEmployees(){
    db.query('SELECT  employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT_WS("", manager.first_name, manager.last_name) AS manager_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};

// Uses SQL to add a department based off user input
function addADepartment() {
    inquirer
      .prompt([
        {
          message: 'What is the name of the Department?',
          name: 'newDepartment',
        },
      ])
      .then((response) => {
        const newDepartmentName = response.newDepartment;
        const sqlQuery = 'INSERT INTO department (name) VALUES (?)';
  
        db.query(sqlQuery, [newDepartmentName], (err, results) => {
          if (err) {
            console.error('Error adding department', err);
          } else {
            console.log('Department added successfully');
          }
          
          mainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
// Uses SQL to add a role based off user input
  function addARole() {
    inquirer
      .prompt([
        {
          message: 'What is the title of the role?',
          name: 'newTitle',
        },
        {
            type: 'number',
            message: 'What is the salary of the role?(Numbers only)',
            name: 'newSalary',

        },
        {
        message: 'What is their department ID?',
        name: 'newDepartmentID',
        },

      ])
      .then((response) => {
        const newTitle = response.newTitle;
        const newSalary = response.newSalary;
        const newDepartmentID = response.newDepartmentID;
        const sqlQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
  
        db.query(sqlQuery, [newTitle, newSalary, newDepartmentID], (err, results) => {
          if (err) {
            console.error('Error adding department', err);
          } else {
            console.log('Role added successfully');
          }
          mainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
// Uses SQL to add an employee based off user input
  function addEmployee() {
    inquirer
      .prompt([
        {
          message: 'What is the first name of the employee?',
          name: 'newFirst',
        },
        {
            message: 'What is the last name of the employee?',
            name: 'newLast',
        },
        {
            message: 'What is the role does this employee belong to?',
            name: 'newID',
        },
        {
            message: 'What is their manager_id?',
            name: 'newMngrID',
        },
      ])
      .then((response) => {
        const newFirst = response.newFirst;
        const newLast = response.newLast;
        const newID = response.newID;
        const newMngrID = response.newMngrID

        const sqlQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
  
        db.query(sqlQuery, [newFirst, newLast, newID, newMngrID], (err, results) => {
          if (err) {
            console.error('Error adding department', err);
          } else {
            console.log('employee added successfully');
          }
          
          mainMenu()
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
// Uses SQL to update an employees role
  function updateEmployeeRole(){
    inquirer
    .prompt([
      {
        message: 'What is the ID of the employee whose role you want to update:',
        name: 'employeeID',
      },
      {
          message: 'Enter the new role ID for the employee:',
          name: 'newRoleID',
      },
      
      ])
      .then ((response) => {
        const employeeID = response.employeeID;
        const newRoleID = response.newRoleID;

        const sqlQuery = 'UPDATE employee SET role_id = ? WHERE id = ?'

        db.query(sqlQuery, [newRoleID, employeeID], (err, results) => {
            if (err){
                console.error('error updating employee role', err);
            } else {
                console.log('Employee role updated succesfully')
            }
            mainMenu();
        })
      })
      .catch((error) => {
        console.error('error', error)

      });

  }