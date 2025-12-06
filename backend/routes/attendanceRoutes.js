import express from 'express';
import Attendance from '../models/Attendance.js';
import Shift from '../models/Shift.js';
import Staff from '../models/Staff.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/attendance
// @desc    Get all attendance records with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { date, staffId, shiftId, status, startDate, endDate } = req.query;
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

    if (staffId) {
      query.staff = staffId;
    }

    if (shiftId) {
      query.shift = shiftId;
    }

    if (status) {
      query.status = status;
    }

    const attendance = await Attendance.find(query)
      .populate('staff')
      .populate('shift')
      .populate('markedBy', 'name email')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/attendance/:id
// @desc    Get attendance by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('staff')
      .populate('shift')
      .populate('markedBy', 'name email');

    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/attendance
// @desc    Create attendance record
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { staffId, shiftId, date, status, remarks } = req.body;

    // Verify staff exists
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Verify shift exists
    const shift = await Shift.findById(shiftId);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    // Check if attendance already exists
    const attendanceExists = await Attendance.findOne({
      staff: staffId,
      shift: shiftId,
      date: new Date(date),
    });

    if (attendanceExists) {
      return res.status(400).json({ message: 'Attendance already recorded for this staff and shift' });
    }

    const attendance = await Attendance.create({
      staff: staffId,
      shift: shiftId,
      date,
      status,
      remarks: remarks || '',
      markedBy: req.admin._id,
    });

    await attendance.populate('staff');
    await attendance.populate('shift');
    await attendance.populate('markedBy', 'name email');

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/attendance/:id
// @desc    Update attendance record
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (attendance) {
      attendance.status = req.body.status || attendance.status;
      attendance.remarks = req.body.remarks !== undefined ? req.body.remarks : attendance.remarks;
      attendance.markedBy = req.admin._id;

      const updatedAttendance = await attendance.save();
      await updatedAttendance.populate('staff');
      await updatedAttendance.populate('shift');
      await updatedAttendance.populate('markedBy', 'name email');

      res.json(updatedAttendance);
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/attendance/:id
// @desc    Delete attendance record
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (attendance) {
      await attendance.deleteOne();
      res.json({ message: 'Attendance record removed' });
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/attendance/bulk
// @desc    Bulk create attendance records for a shift
// @access  Private
router.post('/bulk', protect, async (req, res) => {
  try {
    const { shiftId, attendanceRecords } = req.body;

    // Verify shift exists
    const shift = await Shift.findById(shiftId);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    const results = [];
    const errors = [];

    for (const record of attendanceRecords) {
      try {
        // Check if attendance already exists
        const attendanceExists = await Attendance.findOne({
          staff: record.staffId,
          shift: shiftId,
          date: shift.date,
        });

        if (attendanceExists) {
          // Update existing record
          attendanceExists.status = record.status;
          attendanceExists.remarks = record.remarks || '';
          attendanceExists.markedBy = req.admin._id;
          const updated = await attendanceExists.save();
          await updated.populate('staff');
          results.push(updated);
        } else {
          // Create new record
          const attendance = await Attendance.create({
            staff: record.staffId,
            shift: shiftId,
            date: shift.date,
            status: record.status,
            remarks: record.remarks || '',
            markedBy: req.admin._id,
          });
          await attendance.populate('staff');
          results.push(attendance);
        }
      } catch (error) {
        errors.push({
          staffId: record.staffId,
          error: error.message,
        });
      }
    }

    res.json({
      success: results,
      errors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
