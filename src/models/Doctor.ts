import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  languages: [{
    type: String,
    required: true,
  }],
  consultationFee: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewCount: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  availability: {
    today: [String],
    tomorrow: [String],
  },
  education: [String],
  about: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
}, {
  timestamps: true,
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor; 