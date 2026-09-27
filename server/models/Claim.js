import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    itemId: {
      type: String,
      required: true,
      index: true,
    },
    itemTitle: {
      type: String,
      required: true,
    },
    claimantName: {
      type: String,
      default: 'Campus Student',
      trim: true,
    },
    claimantEmail: {
      type: String,
      default: 'student@campus.edu',
      trim: true,
    },
    claimProof: {
      type: String,
      required: [true, 'Verification proof or answer to the security challenge is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['submitted', 'verified', 'rejected'],
      default: 'submitted',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Claim = mongoose.model('Claim', claimSchema);
