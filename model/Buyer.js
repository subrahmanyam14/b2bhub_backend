const connection = require('../config');

const createBuyerTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS buyers (
        buyer_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT ,
        user_id INT,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating products table:', err.stack);
        return;
      }
      console.log('Sellers table created or already exists');
    });
};

module.exports = createBuyerTable;
