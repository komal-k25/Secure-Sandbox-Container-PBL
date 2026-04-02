import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db'; // This triggers the DB connection test
import authRoutes from './routes/auth'; // Import your new auth routes
import vmRoutes from './routes/vmRoutes';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Tell Express to use your auth routes for anything starting with /api
app.use('/api', authRoutes);
app.use('/api', vmRoutes);
app.use('/api', chatRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: "SSEM API is running smoothly!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});