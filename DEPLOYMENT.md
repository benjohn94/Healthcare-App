# Deployment Guide

This document provides instructions for deploying the Healthcare Staff Shift Scheduler & Attendance Tracker application.

## Deployment Options

### 1. Docker Deployment (Recommended)

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Steps

1. **Clone the repository**
```bash
git clone https://github.com/benjohn94/Healthcare-App.git
cd Healthcare-App
```

2. **Set environment variables** (optional)
```bash
export JWT_SECRET=your_custom_secret_key
```

3. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

4. **Seed the database**
```bash
docker-compose exec backend npm run seed
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Stop the application
```bash
docker-compose down
```

#### Stop and remove volumes
```bash
docker-compose down -v
```

### 2. Manual Deployment

#### Backend Deployment

**Prerequisites:**
- Node.js v18+
- MongoDB running

**Steps:**

1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

4. Seed the database
```bash
npm run seed
```

5. Start the server
```bash
npm start
```

#### Frontend Deployment

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your backend API URL
```

4. Build for production
```bash
npm run build
```

5. Serve the build folder using a web server (e.g., nginx, serve)
```bash
npx serve -s build -l 3000
```

### 3. Cloud Deployment

#### Backend (Heroku, Railway, Render)

1. **Prepare the backend**
   - Ensure `package.json` has the correct start script
   - Set environment variables in the platform

2. **Deploy**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Set environment variables:
     - `NODE_ENV=production`
     - `MONGODB_URI=<your_mongodb_connection_string>`
     - `JWT_SECRET=<your_jwt_secret>`

#### Frontend (Vercel, Netlify)

1. **Prepare the frontend**
   - Set `REACT_APP_API_URL` to your backend URL

2. **Deploy**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Set environment variable:
     - `REACT_APP_API_URL=<your_backend_url>`

#### MongoDB (MongoDB Atlas)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update backend `MONGODB_URI` with the Atlas connection string

### 4. Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET
- [ ] Use secure MongoDB connection (TLS/SSL)
- [ ] Enable CORS only for trusted domains
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Regular backups of database
- [ ] Update dependencies regularly
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Set up error tracking (e.g., Sentry)

### 5. Environment Variables

#### Backend
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare_app
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

#### Frontend
```
REACT_APP_API_URL=http://localhost:5000
```

### 6. Troubleshooting

#### Backend won't start
- Check MongoDB is running
- Verify MONGODB_URI is correct
- Check logs for errors
- Ensure PORT is available

#### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running
- Check browser console for errors

#### Database connection errors
- Verify MongoDB is running
- Check connection string format
- Ensure network connectivity
- Check MongoDB logs

### 7. Monitoring

#### Health Check Endpoints
- Backend: `GET /api/health`
  ```bash
  curl http://localhost:5000/api/health
  ```

#### Logs
- Docker logs: `docker-compose logs -f`
- Backend logs: Check console output
- Frontend logs: Check browser console

### 8. Scaling

For production workloads:
- Use load balancer for backend
- Use CDN for frontend static files
- Use MongoDB replica set
- Implement caching (Redis)
- Use horizontal pod autoscaling (Kubernetes)

### 9. Security Best Practices

1. **Authentication**
   - Use strong passwords
   - Implement password complexity requirements
   - Add rate limiting on login endpoint
   - Consider 2FA for admin accounts

2. **Data Protection**
   - Encrypt sensitive data at rest
   - Use HTTPS for all communications
   - Implement proper session management
   - Regular security audits

3. **API Security**
   - Validate all inputs
   - Sanitize user data
   - Use parameterized queries
   - Implement request throttling
   - Add API versioning

4. **Infrastructure**
   - Keep dependencies updated
   - Use security scanning tools
   - Implement backup strategy
   - Monitor for suspicious activity

### 10. Backup and Recovery

#### Database Backup
```bash
# MongoDB dump
mongodump --uri="mongodb://localhost:27017/healthcare_app" --out=/backup/

# MongoDB restore
mongorestore --uri="mongodb://localhost:27017/healthcare_app" /backup/healthcare_app/
```

#### Automated Backups
- Set up daily backups
- Store backups in multiple locations
- Test restoration regularly
- Keep backup retention policy

## Support

For issues and questions:
- Check the README.md
- Review API documentation
- Check GitHub issues
- Contact development team
