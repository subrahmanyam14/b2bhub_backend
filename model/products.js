const connection = require('../config');

const createProductTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        productname VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        date DATE NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating products table:', err.stack);
        return;
      }
      console.log('Products table created or already exists');
    });
};

module.exports = createProductTable;
