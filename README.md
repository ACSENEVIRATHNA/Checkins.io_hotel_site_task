# checkins.io

## Description
checkins.io is a hotel booking website where users can sign up, log in, create bookings, and manage (update or delete) their bookings. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js), with separate frontend and backend services. JWT is used for authentication and bcrypt for password hashing.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Design Decisions](#design-decisions)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Security](#security)
- [Additional Considerations](#additional-considerations)
- [Screenshots](#screenshots)

## Installation

### Prerequisites
- Node.js
- npm
- MongoDB Atlas account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ACSENEVIRATHNA/Checkins.io_hotel_site_task.git
   cd Checkins.io_hotel_site_task
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add your MongoDB Atlas connection string and JWT secret:
     ```
     PORT=4000
     MONGO_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-jwt-secret
     ```

## Usage

### Running the Backend
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

### Running the Frontend
1. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

### Example Usage
- Access the application at `http://localhost:3000`
- Use the login form to authenticate.

## Features
- User Registration and Login with JWT Authentication
- CRUD operations for hotel bookings:
  - Create new bookings
  - View existing bookings
  - Edit booking details
  - Delete bookings
- Responsive and user-friendly interface
- Styling with Bootstrap
- State management with React Redux

## Design Decisions

### Technology Stack
- **Frontend:** React was chosen for its component-based architecture and efficient state management with hooks. React Router was used for client-side routing, and React Redux for state management. Bootstrap was used for styling to ensure a responsive and consistent UI.
- **Backend:** Express.js was selected for its simplicity and flexibility in handling HTTP requests and defining API endpoints. Node.js provides a robust runtime for building scalable server-side applications.
- **Database:** MongoDB Atlas was chosen for its cloud-based database services, offering scalability and ease of setup. Mongoose was used for object data modeling (ODM) to manage relationships between data and enforce schema validation.

### Authentication
- **JWT:** JSON Web Tokens were implemented for secure user authentication. JWTs are stateless, scalable, and allow easy implementation of private routes in the frontend.
- **Password Encryption:** Bcrypt was used to hash passwords before storing them in the database, ensuring security against potential data breaches.

### UI/UX
- **Responsive Design:** Ensured the application is accessible on both desktop and mobile devices. Used Bootstrap for consistent styling and layout management.
- **Form Validation:** Implemented client-side validation using React state and server-side validation using middleware in Express.js to ensure data integrity.

### API Design
- **RESTful Endpoints:** Defined clear and meaningful endpoints for each CRUD operation, following RESTful principles for consistency and ease of use.
- **Error Handling:** Implemented middleware for centralized error handling and standardized error responses, improving debugging and user experience.

## API Endpoints

### Authentication
- `POST /api/user/login`: User login
- `POST /api/user/register`: User registration

### Bookings
- `POST /api/user/create-booking`: Create a new booking
- `GET /apiuser/get-bookings`: Retrieve all bookings
- `PUT /api/user/update-bookings`: Update a booking
- `DELETE /user/api/delete-booking/:id`: Delete a booking
- `DELETE /user/api/delete-all-bookings`: Delete all bookings

## Database Setup
1. Ensure MongoDB Atlas is set up and running.
2. The backend will automatically connect to the MongoDB Atlas instance specified in the `.env` file.

## Security
- JWT-based authentication for securing routes.
- Passwords are encrypted using bcrypt before storing in the database.

## Additional Considerations
- Use of meaningful variable and function names.
- Thorough input validation and error handling.

## Screenshots
Here is an image of the site:

![Site Screenshot](images/overview.png)
```
