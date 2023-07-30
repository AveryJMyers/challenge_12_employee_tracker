const express = require('express');
const db = require('./db/connection');
const app = express();
const inquirer = require('inquirer');
const departmentFunctions = require('./functions/department')


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


function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};

function viewAllRoles(){
    db.query('SELECT * FROM role', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};

function viewAllEmployees(){
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
};


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
          
          db.end();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
          
          db.end();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
          
          db.end();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }