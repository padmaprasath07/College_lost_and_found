import express from 'express';
import mongoose from 'mongoose';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats,
} from '../controllers/itemController.js';
import { getClaims, submitClaim } from '../controllers/claimController.js';
import { seedDatabase } from '../seed/seed.js';
import { Item } from '../models/Item.js';
import { Claim } from '../models/Claim.js';

const router = express.Router();

// Health Check & Database Diagnostic Endpoint
router.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const isConnected = dbState === 1;

  let counts = { items: 0, claims: 0 };
  if (isConnected) {
    try {
      const [iCount, cCount] = await Promise.all([
        Item.countDocuments(),
        Claim.countDocuments(),
      ]);
      counts = { items: iCount, claims: cCount };
    } catch {
      // Ignored
    }
  }

  res.json({
    status: isConnected ? 'healthy' : 'degraded',
    database: {
      type: 'MongoDB',
      state: states[dbState] || 'Unknown',
      host: mongoose.connection.host || 'localhost',
      name: mongoose.connection.name || 'campusfind_db',
      isAtlasCloud: (mongoose.connection.host || '').includes('mongodb.net'),
      counts,
    },
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Reseed Endpoint
router.post('/seed', async (req, res) => {
  try {
    const { force } = req.body || {};
    const result = await seedDatabase(Boolean(force));
    res.json({ success: true, message: 'CampusFind database seeded successfully', details: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Item Routes
router.route('/items')
  .get(getItems)
  .post(createItem);

router.route('/items/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

// Claim Routes
router.route('/claims')
  .get(getClaims)
  .post(submitClaim);

// Stats Route
router.get('/stats', getStats);

export default router;
