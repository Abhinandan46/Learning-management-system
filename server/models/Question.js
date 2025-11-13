const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['react', 'javascript', 'nodejs', 'mongodb', 'express', 'python', 'data-science', 'html-css', 'git', 'ai-ml', 'docker', 'aws', 'cybersecurity', 'ui-ux', 'devops']
  },
  type: {
    type: String,
    required: true,
    enum: ['mcq', 'short']
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: function() {
      return this.type === 'mcq';
    }
  }],
  correct: {
    type: String,
    required: function() {
      return this.type === 'mcq';
    }
  },
  answer: {
    type: String,
    required: function() {
      return this.type === 'short';
    }
  },
  explanation: {
    type: String,
    required: function() {
      return this.type === 'mcq';
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);