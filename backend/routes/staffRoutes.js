import express from 'express';
import Staff from '../models/Staff.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/staff
// @desc    Get all staff with search and filter
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { search, role, shiftPreference, department } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { staffId: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (shiftPreference) {
      query.shiftPreference = shiftPreference;
    }

    if (department) {
      query.department = department;
    }

    const staff = await Staff.find(query).sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/staff/:id
// @desc    Get staff by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/staff
// @desc    Create new staff
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, staffId, role, shiftPreference, contactNumber, department } = req.body;

    // Check if staffId already exists
    const staffExists = await Staff.findOne({ staffId });

    if (staffExists) {
      return res.status(400).json({ message: 'Staff ID already exists' });
    }

    const staff = await Staff.create({
      name,
      staffId,
      role,
      shiftPreference,
      contactNumber,
      department: department || 'General',
    });

    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update staff
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (staff) {
      staff.name = req.body.name || staff.name;
      staff.role = req.body.role || staff.role;
      staff.shiftPreference = req.body.shiftPreference || staff.shiftPreference;
      staff.contactNumber = req.body.contactNumber || staff.contactNumber;
      staff.department = req.body.department || staff.department;

      const updatedStaff = await staff.save();
      res.json(updatedStaff);
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete staff
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (staff) {
      await staff.deleteOne();
      res.json({ message: 'Staff removed' });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
