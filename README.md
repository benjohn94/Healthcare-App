# Healthcare Staff Shift Scheduler & Attendance Tracker

A full-stack web application for managing healthcare staff shifts and tracking attendance. Built with React.js, Node.js, Express.js, and MongoDB.

## 🎯 Features

### Core Features
- ✅ **Admin Authentication** - Secure login for admin users
- ✅ **Staff Management** - Add, view, edit, and manage healthcare staff
- ✅ **Shift Scheduler** - Create and manage shifts (Morning/Afternoon/Night)
- ✅ **Daily/Weekly Schedule View** - Visual calendar view of shift assignments
- ✅ **Attendance Tracking** - Mark and track staff attendance with remarks
- ✅ **Search and Filter** - Advanced filtering by role, shift, department
- ✅ **Shift Conflict Detection** - Prevents double-booking and shows warnings

### Staff Management
- Add staff with name, ID, role (Doctor/Nurse/Technician), shift preference, contact, and department
- Sortable and searchable staff table
- Role-based filtering

### Shift Scheduler
- Create shifts with configurable capacity
- Assign/unassign staff to shifts
- Real-time capacity tracking
- Color-coded shift types (Morning/Afternoon/Night)
- Conflict detection for double-booking prevention

### Attendance System
- Admin marks attendance (Present/Absent)
- Add remarks (e.g., "Sick Leave", "Late")
- Bulk attendance marking for shifts
- Historical attendance tracking

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **React Context API** - State management
- **Axios** - HTTP client
- **CSS Modules** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Environment Variables** - Secure configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/benjohn94/Healthcare-App.git
cd Healthcare-App
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB connection string
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/healthcare_app
# JWT_SECRET=your_jwt_secret_key_here
# NODE_ENV=development

# Seed the database with initial data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env if needed
# REACT_APP_API_URL=http://localhost:5000

# Start the frontend development server
npm start
```

The frontend will run on `http://localhost:3000`

## 👤 Default Admin Credentials

After running the seed script, use these credentials to login:

- **Email**: admin@healthcare.com
- **Password**: admin123

## 📁 Project Structure

```
Healthcare-App/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── models/
│   │   ├── Admin.js              # Admin model
│   │   ├── Staff.js              # Staff model
│   │   ├── Shift.js              # Shift model
│   │   └── Attendance.js         # Attendance model
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── staffRoutes.js        # Staff management routes
│   │   ├── shiftRoutes.js        # Shift management routes
│   │   └── attendanceRoutes.js   # Attendance routes
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── server.js                 # Express server
│   ├── seed.js                   # Database seeding script
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Dashboard.js      # Dashboard page
│   │   │   ├── StaffManagement.js# Staff management page
│   │   │   ├── ShiftManagement.js# Shift management page
│   │   │   ├── DailySchedule.js  # Schedule view page
│   │   │   └── Attendance.js     # Attendance tracking page
│   │   ├── styles/               # CSS files
│   │   ├── utils/
│   │   │   └── api.js            # API utility functions
│   │   ├── App.js                # Main app component
│   │   └── index.js              # Entry point
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (for initial setup)

### Staff Management
- `GET /api/staff` - Get all staff (with filters)
- `GET /api/staff/:id` - Get staff by ID
- `POST /api/staff` - Create new staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

### Shift Management
- `GET /api/shifts` - Get all shifts (with filters)
- `GET /api/shifts/:id` - Get shift by ID
- `POST /api/shifts` - Create new shift
- `PUT /api/shifts/:id` - Update shift
- `POST /api/shifts/:id/assign` - Assign staff to shift
- `POST /api/shifts/:id/unassign` - Unassign staff from shift
- `DELETE /api/shifts/:id` - Delete shift

### Attendance
- `GET /api/attendance` - Get all attendance records (with filters)
- `GET /api/attendance/:id` - Get attendance by ID
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/:id` - Update attendance record
- `POST /api/attendance/bulk` - Bulk create/update attendance
- `DELETE /api/attendance/:id` - Delete attendance record

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build folder will contain the production-ready files.

## 🚢 Deployment

### Backend Deployment (Example: Heroku, Railway, Render)
1. Set environment variables
2. Deploy backend code
3. Ensure MongoDB connection string is configured

### Frontend Deployment (Example: Vercel, Netlify, Render)
1. Build the frontend
2. Set REACT_APP_API_URL to backend URL
3. Deploy build folder

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Environment variable management
- Input validation

## 🎨 UI/UX Features

- Responsive design
- Color-coded shifts
- Visual status indicators
- Modal dialogs
- Real-time updates
- Intuitive navigation
- Professional healthcare theme

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Healthcare App Development Team

## 🙏 Acknowledgments

Built as an MVP for healthcare staff management and attendance tracking.