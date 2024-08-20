const connection = require('../config');

const addOrder = (req, res) => {
    const { UserID, OrderDate, OrderStatus, PaymentStatus, TotalAmount } = req.body;

    if (!UserID || !OrderDate || !OrderStatus || !PaymentStatus || !TotalAmount) {
        return res.status(400).send({ error: "All fields are required." });
    }

    const query = `
        INSERT INTO orders (UserID, OrderDate, OrderStatus, PaymentStatus, TotalAmount) 
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.execute(query, [UserID, OrderDate, OrderStatus, PaymentStatus, TotalAmount], (err, result) => {
        if (err) {
            console.error('Error adding order:', err.stack);
            return res.status(500).send({ error: "Internal server error." });
        }

        res.status(201).send({ message: "Order added successfully.", OrderID: result.insertId });
    });
};



const getOrders = (req, res) => {
    const query = `SELECT * FROM orders`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err.stack);
            return res.status(500).send({ error: "Internal server error." });
        }

        res.status(200).send(results);
    });
};

module.exports = { addOrder, getOrders };
