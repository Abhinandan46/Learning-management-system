const mongoose = require('mongoose');

const syllabusItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'note', 'quiz']
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: function() {
      return this.type === 'video' || this.type === 'note';
    }
  },
  category: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: function() {
        return this.parent().type === 'quiz';
      }
    },
    options: [{
      type: String,
      required: function() {
        return this.parent().type === 'quiz';
      }
    }],
    correct: {
      type: String,
      required: function() {
        return this.parent().type === 'quiz';
      }
    }
  }]
}, { _id: false });

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  price: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  syllabus: [syllabusItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);