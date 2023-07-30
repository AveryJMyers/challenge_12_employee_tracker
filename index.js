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
}