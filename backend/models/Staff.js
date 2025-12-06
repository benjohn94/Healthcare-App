import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Nurse', 'Technician'],
  },
  shiftPreference: {
    type: String,
    required: true,
    enum: ['Morning', 'Afternoon', 'Night'],
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    default: 'General',
  },
}, {
  timestamps: true,
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
