const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'],
    enum: ['Fashion', 'Digital Products']
  },
  subcategory: {
    type: String,
    trim: true
  },
  image: { 
    type: String, 
    required: [true, 'Product image is required'] 
  },
  images: [{
    type: String
  }],
  stock: { 
    type: Number, 
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  badge: {
    type: String,
    enum: ['Bestseller', 'New', 'Popular', 'Sale', 'None'],
    default: 'None'
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, featured: -1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);