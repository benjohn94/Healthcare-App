import express from 'express';
import Shift from '../models/Shift.js';
import Staff from '../models/Staff.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/shifts
// @desc    Get all shifts with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { date, shiftType, status, startDate, endDate } = req.query;
    let query = {};

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (shiftType) {
      query.shiftType = shiftType;
    }

    if (status) {
      query.status = status;
    }

    const shifts = await Shift.find(query)
      .populate('assignedStaff')
      .sort({ date: 1, shiftType: 1 });

    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/shifts/:id
// @desc    Get shift by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).populate('assignedStaff');

    if (shift) {
      res.json(shift);
    } else {
      res.status(404).json({ message: 'Shift not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/shifts
// @desc    Create new shift
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { date, shiftType, capacity } = req.body;

    // Check if shift already exists for this date and type
    const shiftExists = await Shift.findOne({
      date: new Date(date),
      shiftType,
    });

    if (shiftExists) {
      return res.status(400).json({ message: 'Shift already exists for this date and type' });
    }

    const shift = await Shift.create({
      date,
      shiftType,
      capacity: capacity || 5,
    });

    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/shifts/:id
// @desc    Update shift
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (shift) {
      shift.capacity = req.body.capacity || shift.capacity;
      shift.status = req.body.status || shift.status;

      const updatedShift = await shift.save();
      await updatedShift.populate('assignedStaff');
      
      res.json(updatedShift);
    } else {
      res.status(404).json({ message: 'Shift not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/shifts/:id/assign
// @desc    Assign staff to shift
// @access  Private
router.post('/:id/assign', protect, async (req, res) => {
  try {
    const { staffId } = req.body;
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Check if shift is already at capacity
    if (shift.assignedStaff.length >= shift.capacity) {
      return res.status(400).json({ message: 'Shift is already at full capacity' });
    }

    // Check if staff is already assigned to this shift
    if (shift.assignedStaff.includes(staffId)) {
      return res.status(400).json({ message: 'Staff is already assigned to this shift' });
    }

    // Check for conflict - staff already assigned to another shift on the same day
    const shiftDate = new Date(shift.date);
    const startOfDay = new Date(shiftDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(shiftDate);
    endOfDay.setHours(23, 59, 59, 999);

    const conflictingShifts = await Shift.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      assignedStaff: staffId,
      _id: { $ne: shift._id },
    });

    if (conflictingShifts.length > 0) {
      return res.status(400).json({
        message: 'Shift conflict detected - staff is already assigned to another shift on this day',
        conflictingShifts,
      });
    }

    shift.assignedStaff.push(staffId);
    await shift.save();
    await shift.populate('assignedStaff');

    res.json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/shifts/:id/unassign
// @desc    Unassign staff from shift
// @access  Private
router.post('/:id/unassign', protect, async (req, res) => {
  try {
    const { staffId } = req.body;
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    shift.assignedStaff = shift.assignedStaff.filter(
      (id) => id.toString() !== staffId
    );

    await shift.save();
    await shift.populate('assignedStaff');

    res.json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/shifts/:id
// @desc    Delete shift
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (shift) {
      await shift.deleteOne();
      res.json({ message: 'Shift removed' });
    } else {
      res.status(404).json({ message: 'Shift not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
