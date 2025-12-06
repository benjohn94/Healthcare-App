# Quick Start Guide

Get the Healthcare Staff Shift Scheduler running in 5 minutes!

## Prerequisites

- Docker and Docker Compose installed
- OR Node.js 18+ and MongoDB installed

---

## Option 1: Docker (Recommended) ⚡

### 1. Clone the Repository
```bash
git clone https://github.com/benjohn94/Healthcare-App.git
cd Healthcare-App
```

### 2. Start Everything
```bash
docker-compose up -d
```

### 3. Seed the Database
```bash
docker-compose exec backend npm run seed
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Login**: admin@healthcare.com / admin123

### 5. Stop the Application
```bash
docker-compose down
```

---

## Option 2: Manual Setup 🛠️

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start MongoDB (in another terminal)
mongod

# Seed the database
npm run seed

# Start backend server
npm run dev
```

Backend running at: http://localhost:5000

### Frontend Setup

```bash
# Navigate to frontend (in new terminal)
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start frontend
npm start
```

Frontend running at: http://localhost:3000

---

## Default Login Credentials

**Email**: admin@healthcare.com  
**Password**: admin123

⚠️ **Change these in production!**

---

## Quick Feature Tour

1. **Login** → Use default credentials
2. **Dashboard** → Overview of all features
3. **Staff** → Add sample staff members
4. **Shifts** → Create shifts for next week
5. **Shifts** → Assign staff to shifts
6. **Schedule** → View weekly calendar
7. **Attendance** → Mark attendance for shifts

---

## Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod --version

# Check port 5000 is free
lsof -i :5000
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker issues
```bash
# Reset everything
docker-compose down -v
docker-compose up -d --build
```

---

## Next Steps

- 📖 Read the [User Guide](USER_GUIDE.md) for detailed features
- 🔧 Check [API Documentation](API.md) for API details
- 🚀 See [Deployment Guide](DEPLOYMENT.md) for production
- 🔒 Review [Security Notes](SECURITY.md) before production

---

## Common Tasks

### Add a Staff Member
1. Go to Staff page
2. Click "+ Add New Staff"
3. Fill in details
4. Click "Add Staff"

### Create a Shift
1. Go to Shifts page
2. Click "+ Create New Shift"
3. Select date, type, capacity
4. Click "Create Shift"

### Assign Staff to Shift
1. Find the shift card
2. Click "Assign Staff"
3. Select staff from list
4. Click "Assign"

### Mark Attendance
1. Go to Attendance page
2. Select date
3. Click on shift
4. Mark Present/Absent
5. Add remarks if needed
6. Click "Save Attendance"

---

## Sample Data

After running `npm run seed`, you'll have:
- 1 Admin user
- 7 Sample staff members (Doctors, Nurses, Technicians)
- Various departments (Emergency, Cardiology, ICU, etc.)

---

## Need Help?

- Check the full [README.md](README.md)
- Review [User Guide](USER_GUIDE.md)
- Read [API Documentation](API.md)
- Open an issue on GitHub

---

**Happy Scheduling! 🏥**
