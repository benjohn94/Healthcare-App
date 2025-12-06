# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All API endpoints (except `/auth/login` and `/auth/register`) require JWT authentication.

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Auth Endpoints

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@healthcare.com",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Admin User",
  "email": "admin@healthcare.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

### Register Admin (Initial Setup Only)
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@healthcare.com",
  "password": "admin123"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Admin User",
  "email": "admin@healthcare.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Staff Endpoints

### Get All Staff
```http
GET /staff
```

**Query Parameters:**
- `search` (optional) - Search by name or staff ID
- `role` (optional) - Filter by role (Doctor, Nurse, Technician)
- `shiftPreference` (optional) - Filter by shift preference
- `department` (optional) - Filter by department

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Dr. Sarah Johnson",
    "staffId": "DOC001",
    "role": "Doctor",
    "shiftPreference": "Morning",
    "contactNumber": "+1-555-0101",
    "department": "Emergency",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Staff by ID
```http
GET /staff/:id
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dr. Sarah Johnson",
  "staffId": "DOC001",
  "role": "Doctor",
  "shiftPreference": "Morning",
  "contactNumber": "+1-555-0101",
  "department": "Emergency",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Create Staff
```http
POST /staff
```

**Request Body:**
```json
{
  "name": "Dr. Sarah Johnson",
  "staffId": "DOC001",
  "role": "Doctor",
  "shiftPreference": "Morning",
  "contactNumber": "+1-555-0101",
  "department": "Emergency"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dr. Sarah Johnson",
  "staffId": "DOC001",
  "role": "Doctor",
  "shiftPreference": "Morning",
  "contactNumber": "+1-555-0101",
  "department": "Emergency",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Staff
```http
PUT /staff/:id
```

**Request Body:**
```json
{
  "name": "Dr. Sarah Johnson",
  "role": "Doctor",
  "shiftPreference": "Afternoon",
  "contactNumber": "+1-555-0101",
  "department": "Cardiology"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dr. Sarah Johnson",
  "staffId": "DOC001",
  "role": "Doctor",
  "shiftPreference": "Afternoon",
  "contactNumber": "+1-555-0101",
  "department": "Cardiology",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

### Delete Staff
```http
DELETE /staff/:id
```

**Success Response (200):**
```json
{
  "message": "Staff removed"
}
```

---

## Shift Endpoints

### Get All Shifts
```http
GET /shifts
```

**Query Parameters:**
- `date` (optional) - Filter by specific date (YYYY-MM-DD)
- `startDate` (optional) - Filter from start date
- `endDate` (optional) - Filter to end date
- `shiftType` (optional) - Filter by shift type (Morning, Afternoon, Night)
- `status` (optional) - Filter by status (Active, Completed, Cancelled)

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "date": "2024-01-15T00:00:00.000Z",
    "shiftType": "Morning",
    "capacity": 5,
    "assignedStaff": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Dr. Sarah Johnson",
        "staffId": "DOC001",
        "role": "Doctor"
      }
    ],
    "status": "Active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Shift by ID
```http
GET /shifts/:id
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-01-15T00:00:00.000Z",
  "shiftType": "Morning",
  "capacity": 5,
  "assignedStaff": [...],
  "status": "Active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Create Shift
```http
POST /shifts
```

**Request Body:**
```json
{
  "date": "2024-01-15",
  "shiftType": "Morning",
  "capacity": 5
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-01-15T00:00:00.000Z",
  "shiftType": "Morning",
  "capacity": 5,
  "assignedStaff": [],
  "status": "Active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Shift
```http
PUT /shifts/:id
```

**Request Body:**
```json
{
  "capacity": 7,
  "status": "Active"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-01-15T00:00:00.000Z",
  "shiftType": "Morning",
  "capacity": 7,
  "assignedStaff": [...],
  "status": "Active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

### Assign Staff to Shift
```http
POST /shifts/:id/assign
```

**Request Body:**
```json
{
  "staffId": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-01-15T00:00:00.000Z",
  "shiftType": "Morning",
  "capacity": 5,
  "assignedStaff": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dr. Sarah Johnson",
      ...
    }
  ],
  "status": "Active"
}
```

**Error Response (400) - Shift Conflict:**
```json
{
  "message": "Shift conflict detected - staff is already assigned to another shift on this day",
  "conflictingShifts": [...]
}
```

### Unassign Staff from Shift
```http
POST /shifts/:id/unassign
```

**Request Body:**
```json
{
  "staffId": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-01-15T00:00:00.000Z",
  "shiftType": "Morning",
  "capacity": 5,
  "assignedStaff": [],
  "status": "Active"
}
```

### Delete Shift
```http
DELETE /shifts/:id
```

**Success Response (200):**
```json
{
  "message": "Shift removed"
}
```

---

## Attendance Endpoints

### Get All Attendance Records
```http
GET /attendance
```

**Query Parameters:**
- `date` (optional) - Filter by specific date
- `startDate` (optional) - Filter from start date
- `endDate` (optional) - Filter to end date
- `staffId` (optional) - Filter by staff ID
- `shiftId` (optional) - Filter by shift ID
- `status` (optional) - Filter by status (Present, Absent)

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "staff": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dr. Sarah Johnson",
      "staffId": "DOC001"
    },
    "shift": {
      "_id": "507f1f77bcf86cd799439012",
      "shiftType": "Morning",
      "date": "2024-01-15T00:00:00.000Z"
    },
    "date": "2024-01-15T00:00:00.000Z",
    "status": "Present",
    "remarks": "",
    "markedBy": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "Admin User",
      "email": "admin@healthcare.com"
    },
    "createdAt": "2024-01-15T08:00:00.000Z",
    "updatedAt": "2024-01-15T08:00:00.000Z"
  }
]
```

### Get Attendance by ID
```http
GET /attendance/:id
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "staff": {...},
  "shift": {...},
  "date": "2024-01-15T00:00:00.000Z",
  "status": "Present",
  "remarks": "",
  "markedBy": {...},
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z"
}
```

### Create Attendance Record
```http
POST /attendance
```

**Request Body:**
```json
{
  "staffId": "507f1f77bcf86cd799439011",
  "shiftId": "507f1f77bcf86cd799439012",
  "date": "2024-01-15",
  "status": "Present",
  "remarks": ""
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "staff": {...},
  "shift": {...},
  "date": "2024-01-15T00:00:00.000Z",
  "status": "Present",
  "remarks": "",
  "markedBy": {...},
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z"
}
```

### Update Attendance Record
```http
PUT /attendance/:id
```

**Request Body:**
```json
{
  "status": "Absent",
  "remarks": "Sick Leave"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "staff": {...},
  "shift": {...},
  "date": "2024-01-15T00:00:00.000Z",
  "status": "Absent",
  "remarks": "Sick Leave",
  "markedBy": {...},
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T09:00:00.000Z"
}
```

### Bulk Create/Update Attendance
```http
POST /attendance/bulk
```

**Request Body:**
```json
{
  "shiftId": "507f1f77bcf86cd799439012",
  "attendanceRecords": [
    {
      "staffId": "507f1f77bcf86cd799439011",
      "status": "Present",
      "remarks": ""
    },
    {
      "staffId": "507f1f77bcf86cd799439014",
      "status": "Absent",
      "remarks": "Sick Leave"
    }
  ]
}
```

**Success Response (200):**
```json
{
  "success": [
    {...attendance record 1...},
    {...attendance record 2...}
  ],
  "errors": []
}
```

### Delete Attendance Record
```http
DELETE /attendance/:id
```

**Success Response (200):**
```json
{
  "message": "Attendance record removed"
}
```

---

## Health Check

### Health Check
```http
GET /health
```

**Success Response (200):**
```json
{
  "status": "ok",
  "message": "Healthcare App API is running"
}
```

---

## Error Responses

### Common Error Codes

**400 Bad Request:**
```json
{
  "message": "Invalid request data"
}
```

**401 Unauthorized:**
```json
{
  "message": "Not authorized, no token"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Something went wrong!",
  "error": "Detailed error message (development only)"
}
```

---

## Data Models

### Staff
```typescript
{
  _id: ObjectId,
  name: string (required),
  staffId: string (required, unique),
  role: "Doctor" | "Nurse" | "Technician" (required),
  shiftPreference: "Morning" | "Afternoon" | "Night" (required),
  contactNumber: string (required),
  department: string (default: "General"),
  createdAt: Date,
  updatedAt: Date
}
```

### Shift
```typescript
{
  _id: ObjectId,
  date: Date (required),
  shiftType: "Morning" | "Afternoon" | "Night" (required),
  capacity: number (required, default: 5),
  assignedStaff: ObjectId[] (ref: Staff),
  status: "Active" | "Completed" | "Cancelled" (default: "Active"),
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance
```typescript
{
  _id: ObjectId,
  staff: ObjectId (ref: Staff, required),
  shift: ObjectId (ref: Shift, required),
  date: Date (required),
  status: "Present" | "Absent" (required),
  remarks: string,
  markedBy: ObjectId (ref: Admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Admin
```typescript
{
  _id: ObjectId,
  name: string (required),
  email: string (required, unique),
  password: string (required, hashed),
  role: string (default: "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Rate Limiting

Currently not implemented. Consider adding rate limiting in production:
- Login endpoint: 5 requests per 15 minutes
- Other endpoints: 100 requests per 15 minutes

## Security Notes

1. All passwords are hashed using bcryptjs
2. JWT tokens expire after 30 days
3. Protected routes require valid JWT token
4. Mongoose validation prevents invalid data
5. CORS enabled for cross-origin requests

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@healthcare.com","password":"admin123"}'
```

### Get Staff (with token)
```bash
curl -X GET http://localhost:5000/api/staff \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Shift
```bash
curl -X POST http://localhost:5000/api/shifts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-01-15","shiftType":"Morning","capacity":5}'
```
