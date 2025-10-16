const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  preferences: {
    fashion: { type: Boolean, default: true },
    digital: { type: Boolean, default: true },
    offers: { type: Boolean, default: true },
    newArrivals: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Index for better query performance
newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ isActive: 1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);