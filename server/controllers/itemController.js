import { Item } from '../models/Item.js';
import { Claim } from '../models/Claim.js';

// GET /api/items
export const getItems = async (req, res) => {
  try {
    const { type, status, category, location, search } = req.query;
    const filter = {};

    if (type && type.toLowerCase() !== 'all') {
      filter.type = type.toLowerCase();
    }

    if (status && status.toLowerCase() !== 'all') {
      filter.status = status.toLowerCase();
    }

    if (category && category.toLowerCase() !== 'all') {
      filter.category = category;
    }

    if (location && location.toLowerCase() !== 'all locations') {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ];
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/items/:id
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/items
export const createItem = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id || `item-${Date.now()}`;

    const newItem = new Item({
      ...data,
      id,
      status: data.status || 'available',
      image:
        data.image ||
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    });

    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT /api/items/:id
export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Cascade delete associated claims
    await Claim.deleteMany({ itemId: req.params.id });

    res.json({ success: true, message: 'Item and associated claims deleted', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/stats
export const getStats = async (req, res) => {
  try {
    const [total, lostCount, foundCount, claimedCount, claimsTotal] = await Promise.all([
      Item.countDocuments(),
      Item.countDocuments({ type: 'lost' }),
      Item.countDocuments({ type: 'found' }),
      Item.countDocuments({ status: 'claimed' }),
      Claim.countDocuments(),
    ]);

    const resolutionRate = total > 0 ? Math.round((claimedCount / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        totalItems: total,
        lostItems: lostCount,
        foundItems: foundCount,
        claimedItems: claimedCount,
        totalClaims: claimsTotal,
        resolutionRate: `${resolutionRate}%`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
