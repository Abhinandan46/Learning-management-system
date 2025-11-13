# LMS Backend API

This is the backend API for the Learning Management System (LMS) built with Node.js, Express, and MongoDB.

## Features

- RESTful API for courses and interview questions
- MongoDB database with Mongoose ODM
- CORS enabled for frontend integration
- Environment-based configuration
- Data seeding script for initial setup

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update MongoDB connection string if needed

4. Start MongoDB service (if using local MongoDB):
   ```bash
   # On Windows
   net start MongoDB

   # On macOS
   brew services start mongodb/brew/mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Database Seeding

To populate the database with initial data from your `data.js` file:

```bash
npm run seed
```

To destroy all data:

```bash
npm run seed -d
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course by ID

### Questions
- `GET /api/questions` - Get all interview questions
- `GET /api/questions?category=react` - Get questions filtered by category
- `GET /api/questions/:id` - Get single question by ID

### Health Check
- `GET /api/health` - API health check

## Project Structure

```
server/
├── config/
│   └── database.js          # Database connection
├── models/
│   ├── Course.js           # Course model
│   └── Question.js         # Question model
├── routes/
│   ├── courses.js          # Course routes
│   └── questions.js        # Question routes
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── seeder.js              # Database seeding script
└── server.js              # Main server file
```

## Environment Variables

Create a `.env` file in the server directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms-db
```

## Connecting to Frontend

The backend API will be accessible at `http://localhost:5000`. Update your frontend axios calls to use this base URL.

Example:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch courses
const response = await axios.get(`${API_BASE_URL}/courses`);
```