import { Claim } from '../models/Claim.js';
import { Item } from '../models/Item.js';

// GET /api/claims
export const getClaims = async (req, res) => {
  try {
    const { itemId } = req.query;
    const filter = itemId ? { itemId } : {};
    const claims = await Claim.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: claims.length, data: claims });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/claims
export const submitClaim = async (req, res) => {
  try {
    const { itemId, itemTitle, claimantName, claimantEmail, claimProof } = req.body;

    if (!itemId || !claimProof) {
      return res.status(400).json({
        success: false,
        error: 'Item ID and verification proof are required.',
      });
    }

    const item = await Item.findOne({ id: itemId });
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    const claimId = `claim-${Date.now()}`;
    const newClaim = new Claim({
      id: claimId,
      itemId,
      itemTitle: itemTitle || item.title,
      claimantName: claimantName || 'Campus Student',
      claimantEmail: claimantEmail || 'student@campus.edu',
      claimProof,
      status: 'verified',
    });

    const savedClaim = await newClaim.save();

    // Mark item status as 'claimed' in MongoDB
    item.status = 'claimed';
    await item.save();

    res.status(201).json({
      success: true,
      message: 'Claim verified and submitted successfully!',
      data: savedClaim,
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
