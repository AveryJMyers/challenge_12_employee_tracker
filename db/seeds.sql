
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources'),
    ('Engineering');


INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Associate', 50000, 1),
    ('Sales Manager', 80000, 1),
    ('Marketing Specialist', 60000, 2),
    ('Financial Analyst', 70000, 3),
    ('HR Coordinator', 55000, 4),
    ('Software Engineer', 85000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Brown', 4, 2),
    ('David', 'Lee', 5, 2),
    ('Sarah', 'Williams', 6, 3);


