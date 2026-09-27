import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.js';
import { seedDatabase } from './seed/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Mount API routes
app.use('/api', apiRoutes);

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    project: 'CampusFind — College Lost & Found Management Platform API',
    database: 'MongoDB (Mongoose ODM)',
    version: '1.0.0',
    documentation: '/api/health',
    status: 'online',
  });
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Endpoint not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[CampusFind Server Error]', err.stack || err.message);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// Initialize Database & Boot Server
const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      await seedDatabase(false);
    }

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🎓 CampusFind API Server Running on port ${PORT}`);
      console.log(`📡 Health & DB Status: http://localhost:${PORT}/api/health`);
      console.log(`📦 Lost & Found API:  http://localhost:${PORT}/api/items`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start CampusFind server:', error);
  }
};

startServer();
