import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Staff from './models/Staff.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await Staff.deleteMany();

    console.log('Existing data cleared');

    // Create admin user
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@healthcare.com',
      password: 'admin123',
    });

    console.log('Admin user created:');
    console.log('Email: admin@healthcare.com');
    console.log('Password: admin123');

    // Create sample staff
    const sampleStaff = [
      {
        name: 'Dr. Sarah Johnson',
        staffId: 'DOC001',
        role: 'Doctor',
        shiftPreference: 'Morning',
        contactNumber: '+1-555-0101',
        department: 'Emergency',
      },
      {
        name: 'Dr. Michael Chen',
        staffId: 'DOC002',
        role: 'Doctor',
        shiftPreference: 'Afternoon',
        contactNumber: '+1-555-0102',
        department: 'Cardiology',
      },
      {
        name: 'Nurse Emily Davis',
        staffId: 'NUR001',
        role: 'Nurse',
        shiftPreference: 'Morning',
        contactNumber: '+1-555-0201',
        department: 'Emergency',
      },
      {
        name: 'Nurse James Wilson',
        staffId: 'NUR002',
        role: 'Nurse',
        shiftPreference: 'Night',
        contactNumber: '+1-555-0202',
        department: 'ICU',
      },
      {
        name: 'Nurse Maria Garcia',
        staffId: 'NUR003',
        role: 'Nurse',
        shiftPreference: 'Afternoon',
        contactNumber: '+1-555-0203',
        department: 'Pediatrics',
      },
      {
        name: 'Tech. Robert Brown',
        staffId: 'TEC001',
        role: 'Technician',
        shiftPreference: 'Morning',
        contactNumber: '+1-555-0301',
        department: 'Radiology',
      },
      {
        name: 'Tech. Lisa Anderson',
        staffId: 'TEC002',
        role: 'Technician',
        shiftPreference: 'Afternoon',
        contactNumber: '+1-555-0302',
        department: 'Laboratory',
      },
    ];

    await Staff.insertMany(sampleStaff);

    console.log('Sample staff data created');
    console.log('Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
