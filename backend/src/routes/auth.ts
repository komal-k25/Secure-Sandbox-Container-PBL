import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db'; // Importing the database connection

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
    try {
        // 1. Grab the data from the frontend 
        const { username, email, password } = req.body;

        // 2. Basic validation: Make sure nothing is left blank
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // 3. Hash the password using bcrypt
        const saltRounds = 10; // This determines how complex the scrambling is
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Save the user to the database
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // 5. Tell the frontend that the user is registered
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error: any) {
        console.error('Registration error:', error);
        
        // MySQL throws 'ER_DUP_ENTRY' if someone tries to use an email/username that already exists
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Username or email already exists.' });
        }
        
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user left anything blank
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // 2. Find the user in the database
        // We use 'any' here temporarily so TypeScript doesn't complain about row types
        const [rows]: any = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // 3. If the user doesn't exist, kick them out
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = rows[0];

        // 4. The Security Magic: Compare the typed password to the scrambled one
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // 5. Success! Generate their JWT VIP wristband
        // Make sure to set a secret key in your .env file later
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET || 'fallback_super_secret_key', 
            { expiresIn: '1h' } // Token expires in 1 hour for security
        );

        // 6. Send the token back to frontend
        res.status(200).json({
            message: 'Login successful!',
            token: token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;