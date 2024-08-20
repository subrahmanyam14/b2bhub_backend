const connection=require('../config')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "All fields are required." });
    }
    const query = `SELECT * FROM users WHERE email = ?`;
    connection.execute(query, [email], async (err, result) => {
        if (err) {
            console.log("Error in login:", err.stack);
            return res.status(500).send({ error: "Internal server error." });
        }
        if (result.length === 0) {
            return res.status(404).send({ error: "User not found." });
        }
        try {
            const bcryptedpassword = result[0].password;
            const isPasswordCorrect = await bcrypt.compare(password, bcryptedpassword);
            if (!isPasswordCorrect) {
                return res.status(401).send({ error: "Incorrect password." });
            }
            const token = await jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
            return res.status(200).send({ message: "Login successful.", token });
        } catch (error) {
            console.log("Error in login:", error.stack);
            return res.status(500).send({ error: "Internal server error." });
        }
    });
};


const register = async (req, res) => {
    const { email, password, companyname, GSTnumber, mobilenumber } = req.body;
    if (!email || !password || !companyname || !GSTnumber || !mobilenumber) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const bcryptedpassword = await bcrypt.hash(password, salt);
        const query1 = `INSERT INTO users(email, password, companyname, GSTnumber, mobilenumber) VALUES (?, ?, ?, ?, ?)`;
        connection.execute(query1, [email, bcryptedpassword, companyname, GSTnumber, mobilenumber], async (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send({ error: "Email already registered." });
                }
                console.log("Error in register:", err.stack);
                return res.status(500).send({ error: "Internal server error." });
            }
            const token = await jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
            return res.status(201).send({ message: "Registration successful.", token });
        });
    } catch (error) {
        console.log("Error in register:", error.stack);
        return res.status(500).send({ error: "Internal server error." });
    }
};

module.exports = { login, register}