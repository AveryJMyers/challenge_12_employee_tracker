INSERT INTO department (name) VALUES
    ('Human Resources'),
    ('Finance'),
    ('Marketing'),
    ('Engineering');


INSERT INTO role (title, salary, department_id) VALUES
    ('HR Manager', 60000.00, 1),
    ('Finance Analyst', 55000.00, 2),
    ('Marketing Coordinator', 50000.00, 3),
    ('Software Engineer', 75000.00, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Brown', 4, NULL);
