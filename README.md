# Hotel Booking Site

This is a hotel booking web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). Users can sign up, log in, and make reservations, as well as manage their bookings by viewing, deleting, and updating them. JWT tokens are used for authentication, and bcrypt is used to hash passwords.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- JWT token-based authentication
- Password hashing with bcrypt
- Make reservations
- View, update, and delete reservations
- Responsive user interface

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ACSENEVIRATHNA/Checkins.io_hotel_site_task.git
   cd Checkins.io_hotel_site_task
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=your_port
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend:
   ```bash
   cd ../backend
   npm start
   ```

6. Start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.

2. Sign up for a new account or log in with an existing account.

3. Make a reservation by providing the required details.

4. Manage your reservations by viewing, updating, or deleting them from your account dashboard.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- JWT (JSON Web Tokens)
- bcrypt

