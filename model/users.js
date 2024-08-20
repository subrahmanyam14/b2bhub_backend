const connection = require('../config');

const createTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) unique,
        password VARCHAR(255) NOT NULL,
        mobilenumber varchar(12) Not null,
        companyname varchar(25) not null,
        gst_number varchar(25) not null,
        isadmin BOOLEAN NOT NULL
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating table:', err.stack);
        return;
      }
      console.log('User table  created or already exists');
    });
  };
  
  module.exports = createTable;