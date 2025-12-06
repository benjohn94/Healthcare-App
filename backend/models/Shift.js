import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shiftType: {
    type: String,
    required: true,
    enum: ['Morning', 'Afternoon', 'Night'],
  },
  capacity: {
    type: Number,
    required: true,
    default: 5,
  },
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  }],
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

// Create compound index to ensure unique shift per date and type
shiftSchema.index({ date: 1, shiftType: 1 }, { unique: true });

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;
