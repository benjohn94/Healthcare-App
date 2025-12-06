# User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Login](#login)
3. [Dashboard](#dashboard)
4. [Staff Management](#staff-management)
5. [Shift Management](#shift-management)
6. [Daily Schedule View](#daily-schedule-view)
7. [Attendance Tracking](#attendance-tracking)

---

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Admin credentials

### First Time Setup
1. Ensure the backend server is running
2. Navigate to `http://localhost:3000`
3. Login with default credentials:
   - Email: `admin@healthcare.com`
   - Password: `admin123`

---

## Login

The login page is the entry point to the Healthcare Staff Scheduler application.

### Features
- Secure authentication
- Password protection
- Remember session
- Error handling

### Steps to Login
1. Enter your admin email address
2. Enter your password
3. Click "Login" button
4. You will be redirected to the Dashboard

### Default Credentials
For initial setup, use:
- **Email**: admin@healthcare.com
- **Password**: admin123

**Important**: Change these credentials after first login in production!

---

## Dashboard

The dashboard provides an overview of the system and quick access to all major features.

### Dashboard Components

1. **Welcome Header**
   - Displays admin name
   - Shows application title

2. **Quick Access Cards**
   - Staff Management
   - Shift Scheduler
   - Daily Schedule
   - Attendance Tracking

3. **Quick Actions**
   - Add New Staff
   - Create New Shift
   - Mark Attendance

### Navigation
Click on any card to navigate to the respective section.

---

## Staff Management

Manage all healthcare staff members in your organization.

### Features
- Add new staff members
- View all staff in a sortable table
- Search by name or staff ID
- Filter by role, shift preference
- Update staff information
- Delete staff members

### Adding New Staff

1. Click "+ Add New Staff" button
2. Fill in the required information:
   - **Name**: Full name of the staff member
   - **Staff ID**: Unique identifier (e.g., DOC001)
   - **Role**: Select from Doctor, Nurse, or Technician
   - **Shift Preference**: Morning, Afternoon, or Night
   - **Contact Number**: Phone number
   - **Department**: Department name (optional)
3. Click "Add Staff" button

### Searching and Filtering

1. **Search Box**: Type name or staff ID to search
2. **Role Filter**: Select role from dropdown
3. **Shift Filter**: Select shift preference from dropdown
4. Results update automatically

### Viewing Staff List

The staff table displays:
- Staff ID
- Name
- Role
- Shift Preference
- Department
- Contact Number
- Actions (Delete button)

### Deleting Staff

1. Click "Delete" button next to the staff member
2. Confirm deletion in the popup
3. Staff member will be removed

**Note**: Deleting staff will not affect historical records.

---

## Shift Management

Create and manage shifts for your healthcare facility.

### Features
- Create shifts for different times
- Set shift capacity
- Assign staff to shifts
- View assigned staff
- Shift conflict detection
- Color-coded shift types
- Real-time capacity tracking

### Understanding Shift Types

1. **Morning Shift** (Orange/Beige)
   - Time: 6 AM - 2 PM
   - Ideal for: Staff with morning preference

2. **Afternoon Shift** (Blue)
   - Time: 2 PM - 10 PM
   - Ideal for: Staff with afternoon preference

3. **Night Shift** (Purple)
   - Time: 10 PM - 6 AM
   - Ideal for: Staff with night preference

### Creating a New Shift

1. Click "+ Create New Shift" button
2. Select the date
3. Choose shift type (Morning/Afternoon/Night)
4. Set capacity (number of staff needed)
5. Click "Create Shift" button

### Shift Status Indicators

- **Unassigned** (Red): No staff assigned
- **Understaffed** (Orange): Some staff assigned but below capacity
- **Full** (Green): All positions filled
- **Overstaffed** (Red): More staff than capacity

### Assigning Staff to Shift

1. Click "Assign Staff" on the shift card
2. Modal opens with available staff list
3. (Optional) Filter by role
4. Click "Assign" next to the staff member
5. Staff is added to the shift

### Shift Conflict Detection

The system automatically prevents:
- Assigning same staff to multiple shifts on the same day
- Exceeding shift capacity
- Invalid assignments

If a conflict is detected, an error message will be displayed.

### Unassigning Staff

1. Click "×" button next to staff name in the shift card
2. Staff is removed from the shift

### Deleting Shifts

1. Click "Delete" button on shift card
2. Confirm deletion
3. Shift is removed

---

## Daily Schedule View

View weekly schedule in a calendar format.

### Features
- Weekly calendar view
- Color-coded shifts
- Staff assignments visible
- Capacity indicators
- Week navigation
- Status badges

### Navigation

1. **Previous Week**: Click "← Previous" button
2. **Next Week**: Click "Next →" button
3. **Today**: Click "Today" button to jump to current week

### Understanding the Schedule Table

**Rows**: Shift types (Morning, Afternoon, Night)
**Columns**: Days of the week (Sunday - Saturday)

Each cell shows:
- Status badge (Unassigned/Understaffed/Full/Overstaffed)
- Current capacity (e.g., 3 / 5)
- Names of assigned staff

### Color Coding

- **Morning shifts**: Light orange/beige background
- **Afternoon shifts**: Light blue background
- **Night shifts**: Light purple background
- **No shift**: Gray background with "-"

### Status Badges

- **Red badge**: Unassigned or Overstaffed
- **Orange badge**: Understaffed
- **Green badge**: Full capacity

---

## Attendance Tracking

Mark and manage staff attendance for shifts.

### Features
- Select date
- View shifts for the day
- Mark attendance (Present/Absent)
- Add remarks
- Bulk attendance marking
- Historical tracking

### Marking Attendance

#### Step 1: Select Date
1. Use the date picker to select the date
2. Available shifts for that date will be displayed

#### Step 2: Select Shift
1. Click on the shift card
2. You'll see all assigned staff for that shift

#### Step 3: Mark Attendance
1. For each staff member, select status:
   - **Present**: Staff attended the shift
   - **Absent**: Staff did not attend
2. (Optional) Add remarks:
   - "Sick Leave"
   - "Late"
   - "Early departure"
   - etc.

#### Step 4: Save
1. Click "Save Attendance" button
2. Attendance records are saved
3. Success message appears

### Viewing Existing Attendance

If attendance has already been marked:
- Previously marked statuses will be pre-selected
- Remarks will be shown
- You can update and save changes

### Attendance Remarks

Common remarks include:
- Sick Leave
- Annual Leave
- Late arrival
- Early departure
- Medical emergency
- Training
- Conference

### Tips
- Mark attendance shortly after shift starts
- Add remarks for absences
- Update if status changes
- Review before saving

---

## Navigation Bar

The top navigation bar is always visible and provides:

### Navigation Links
- **Dashboard**: Home page
- **Staff**: Staff management
- **Shifts**: Shift management
- **Schedule**: Weekly schedule view
- **Attendance**: Attendance tracking

### User Menu
- **User Name**: Displays logged-in admin name
- **Logout**: Click to logout

---

## Best Practices

### Staff Management
1. Use consistent naming conventions for staff IDs
2. Keep contact information updated
3. Review staff list regularly
4. Archive inactive staff instead of deleting

### Shift Management
1. Create shifts at least a week in advance
2. Consider staff preferences when assigning
3. Avoid overloading specific staff members
4. Review shift coverage daily
5. Address understaffed shifts promptly

### Schedule Planning
1. Review weekly schedule every Monday
2. Plan for holidays and special events
3. Maintain minimum staff levels
4. Balance workload across staff
5. Consider staff preferences

### Attendance Tracking
1. Mark attendance daily
2. Add clear remarks for absences
3. Follow up on unexplained absences
4. Maintain accurate records
5. Review attendance patterns monthly

---

## Troubleshooting

### Can't Login
- Verify email and password are correct
- Check if backend server is running
- Clear browser cache and cookies
- Contact system administrator

### Staff Not Showing
- Refresh the page
- Check filter settings
- Clear search box
- Verify staff was created successfully

### Can't Assign Staff to Shift
- Check if staff is already assigned to another shift that day
- Verify shift capacity hasn't been reached
- Ensure shift date is in the future or today
- Check for system errors

### Attendance Not Saving
- Verify you selected a status for each staff member
- Check internet connection
- Refresh page and try again
- Contact administrator if issue persists

---

## Keyboard Shortcuts

Currently not implemented. Future versions may include:
- `Ctrl/Cmd + K`: Quick search
- `N`: Create new staff/shift
- `Esc`: Close modal
- Arrow keys: Navigate schedule

---

## Mobile Support

The application is responsive and works on mobile devices:
- iOS (Safari, Chrome)
- Android (Chrome, Firefox)
- Tablets

**Note**: Some features may be optimized for desktop use.

---

## Tips & Tricks

1. **Bulk Operations**: Use the bulk attendance feature to save time
2. **Filters**: Combine multiple filters for precise searches
3. **Keyboard**: Use Tab key to move between form fields quickly
4. **Refresh**: Refresh page if data doesn't update immediately
5. **Logout**: Always logout when finished, especially on shared computers

---

## Getting Help

If you need assistance:
1. Check this user guide
2. Review the README.md file
3. Check API documentation
4. Contact your system administrator
5. Report bugs on GitHub

---

## Security Tips

1. **Never share** your admin credentials
2. **Logout** when finished, especially on shared computers
3. **Change** default password immediately
4. **Use strong** passwords (mix of letters, numbers, symbols)
5. **Report** suspicious activity immediately

---

## Updates & Maintenance

- The system may be updated periodically
- Clear browser cache after updates
- Refresh page to see latest changes
- Report any issues after updates

---

## Feedback

We welcome your feedback to improve the application:
- Feature requests
- Bug reports
- Usability suggestions
- Performance issues

Contact the development team through GitHub issues.
