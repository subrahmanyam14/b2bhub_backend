const connection = require('../config');


const addProduct = (req, res) => {
    const { UserID, ProductName, Price, Quantity } = req.body;

    if (!UserID || !ProductName || !Price || !Quantity) {
        return res.status(400).send({ error: "All fields are required." });
    }

    const query = `INSERT INTO products (UserID, ProductName, Price, Quantity) VALUES (?, ?, ?, ?)`;

    connection.execute(query, [UserID, ProductName, Price, Quantity], (err, result) => {
        if (err) {
            console.error('Error adding product:', err.stack);
            return res.status(500).send({ error: "Internal server error." });
        }

        res.status(201).send({ message: "Product added successfully.", productID: result.insertId });
    });
};

const getProducts = (req, res) => {
    const query = `SELECT * FROM products`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving products:', err.stack);
            return res.status(500).send({ error: "Internal server error." });
        }

        res.status(200).send(results);
    });
};

module.exports = { addProduct, getProducts };
