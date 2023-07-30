const db = require('../db/connection');
const inquirer = require('inquirer');


// GET all departments
function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, results) => {
        if (err) console.log(err);  
        console.table(results);
        mainMenu();
    });
}

module.exports = viewAllDepartments;