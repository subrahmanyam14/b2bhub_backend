const connection = require('../config');

const createOrderTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        order_date DATE NOT NULL,
        order_status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL,
        payment_status ENUM('Paid', 'Unpaid', 'Refunded') NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating orders table:', err.stack);
        return;
      }
      console.log('Orders table created or already exists');
    });
};

module.exports = createOrderTable;
