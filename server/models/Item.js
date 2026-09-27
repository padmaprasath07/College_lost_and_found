import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: [true, 'Report type is required (lost or found)'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Item title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Electronics',
        'ID Cards & Wallets',
        'Books & Notes',
        'Keys',
        'Accessories',
        'Other',
      ],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Campus location is required'],
      trim: true,
      index: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      default: '12:00 PM',
    },
    status: {
      type: String,
      enum: ['available', 'claimed', 'pending_verification'],
      default: 'available',
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Item description is required'],
      trim: true,
    },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    },
    reportedBy: {
      type: String,
      default: 'Student (Verified)',
      trim: true,
    },
    securityQuestion: {
      type: String,
      default: 'Describe unique identifiable marks or features',
      trim: true,
    },
    contactEmail: {
      type: String,
      default: 'student@campus.edu',
      trim: true,
    },
    contactPhone: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound text index for fast keyword search across title, description, and location
itemSchema.index({ title: 'text', description: 'text', location: 'text' });

export const Item = mongoose.model('Item', itemSchema);
