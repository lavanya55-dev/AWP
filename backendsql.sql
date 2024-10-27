create database user_login_database;
use user_login_database;
create table users(name
varchar (50) , 
 email varchar(100) unique not null,
password varchar (255) not null)
;
drop database user_login_database;


select *from users;
drop table users;


CREATE DATABASE appointment_db;

USE appointment_db;

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL
);
select * from appointments;
INSERT INTO appointments (full_name, phone_number, email_address, preferred_date) 
VALUES 
('Amit Sharma', '9876543210', 'amit.sharma@gmail.com', '2024-10-28'),
('Priya Nair', '9123456789', 'priya.nair@gmail.com', '2024-11-02'),
('Rahul Desai', '9988776655', 'rahul.desai@gmail.com', '2024-10-30'),
('Sneha Kulkarni', '8899776655', 'sneha.kulkarni@gmail.com', '2024-11-05'),
('Vikram Singh', '9765432101', 'vikram.singh@gmail.com', '2024-11-12');
drop table appointments;












INSERT INTO users (username, email, password)
VALUES 
( "Lavanya","Mujumdar","lavanyamujumdar44@gmail.com","lavanya55","lavanya55","female"),
('John', 'Doe', 'johndoe@gmail.com', 'JohnDoe', 'JohnDoe', 'male'),
('Jane', 'Smith', 'janesmith@gmail.com', 'JaneSmith', 'JaneSmith', 'female'),
('Alice', 'Johnson', 'alicejohnson@gmail.com', 'AliceJohnson', 'AliceJohnson', 'female'),
('Bob', 'Jones', 'bobjones@gmail.com', 'BobJones', 'BobJones', 'male'),
('Emily', 'Brown', 'emilybrown@gmail.com', 'EmilyBrown', 'EmilyBrown', 'female'),
('Michael', 'Davis', 'michaeldavis@gmail.com', 'MichaelDavis', 'MichaelDavis', 'male'),
('Sarah', 'Wilson', 'sarahwilson@gmail.com', 'SarahWilson', 'SarahWilson', 'female'),
('David', 'Martinez', 'davidmartinez@gmail.com', 'DavidMartinez', 'DavidMartinez', 'male'),
('Emma', 'Taylor', 'emmataylor@gmail.com', 'EmmaTaylor', 'EmmaTaylor', 'female'),
('William', 'Anderson', 'williamanderson@gmail.com', 'WilliamAnderson', 'WilliamAnderson', 'male'),
('Olivia', 'Thomas', 'oliviathomas@gmail.com', 'OliviaThomas', 'OliviaThomas', 'female'),
('James', 'Hernandez', 'jameshernandez@gmail.com', 'JamesHernandez', 'JamesHernandez', 'male'),
('Sophia', 'Lopez', 'sophialopez@gmail.com', 'SophiaLopez', 'SophiaLopez', 'female'),
('Benjamin', 'Lee', 'benjaminlee@gmail.com', 'BenjaminLee', 'BenjaminLee', 'male'),
('Isabella', 'Gonzalez', 'isabellagonzalez@gmail.com', 'IsabellaGonzalez', 'IsabellaGonzalez', 'female');
