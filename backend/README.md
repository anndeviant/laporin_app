# Laporin Backend API

Backend service for Laporin - an infrastructure damage reporting application.

## Overview

This backend provides RESTful API endpoints for the Laporin application, handling user reports of infrastructure damage, admin verification, and agency management.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- bcrypt

## Prerequisites

- Node.js
- MySQL Server
- npm or yarn

## Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd laporin_app/backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   # Database Configuration
   DB_NAME=laporin_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost

   # JWT Secret Keys
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   # Client URL (for CORS)
   CLIENT_URL=http://localhost:3000

   # Server Configuration
   PORT=5000
   ```

4. Create database

   ```sql
   CREATE DATABASE laporin_db;
   ```

5. Run the server

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Health Check

- `GET /` - API health check

### Public Endpoints (Guest/Reporter)

#### Reports

- `GET /public/reports` - Get all public reports (filtered)
- `GET /public/reports/:id` - View details of a specific report
- `POST /public/reports` - Submit a new infrastructure damage report
  - Body: `{ title, description, category_id, reporter_name, reporter_contact, location, images[] }`
- `GET /public/reports/track/:id` - Track report status using report ID

#### Categories

- `GET /public/categories` - Get all available report categories

#### Agencies

- `GET /public/agencies` - Get list of government agencies

### Admin Endpoints (Protected)

#### Authentication

- `POST /auth/login` - Admin login
  - Body: `{ username, password }`
  - Returns: `{ accessToken, refreshToken }`
- `POST /auth/logout` - Admin logout
  - Body: `{ refreshToken }`
- `GET /auth/token` - Refresh access token
  - Header: `{ refreshToken }`
  - Returns: `{ accessToken }`

#### Report Management

- `GET /admin/reports` - Get all reports with filtering options
  - Query: `{ status, category, date_from, date_to, agency_id }`
- `GET /admin/reports/:id` - Get detailed report information
- `PUT /admin/reports/:id` - Update report details
  - Body: `{ title, description, category_id, status, agency_id }`
- `DELETE /admin/reports/:id` - Delete a report
- `PUT /admin/reports/:id/verify` - Verify a pending report
  - Body: `{ status, note, agency_id? }`
- `PUT /admin/reports/:id/assign` - Assign report to an agency
  - Body: `{ agency_id, note }`
- `PUT /admin/reports/:id/resolve` - Mark report as resolved
  - Body: `{ note }`
- `PUT /admin/reports/:id/reject` - Reject a report
  - Body: `{ note }`

#### Report History

- `GET /admin/reports/:id/history` - Get complete history of a report

#### Category Management

- `GET /admin/categories` - Get all categories
- `POST /admin/categories` - Create new category
  - Body: `{ name, description }`
- `PUT /admin/categories/:id` - Update category
  - Body: `{ name, description }`
- `DELETE /admin/categories/:id` - Delete category

#### Agency Management

- `GET /admin/agencies` - Get all agencies
- `POST /admin/agencies` - Create new agency
  - Body: `{ name, division, contact, service_area }`
- `PUT /admin/agencies/:id` - Update agency
  - Body: `{ name, division, contact, service_area, is_active }`
- `DELETE /admin/agencies/:id` - Delete agency

#### Admin Management

- `GET /admin/users` - Get all admin users
- `POST /admin/users` - Create new admin user
- `PUT /admin/users/:id` - Update admin user
- `DELETE /admin/users/:id` - Delete admin user

## Database Models

### Admin

Admin user accounts for management and moderation.

### Report

Infrastructure damage reports submitted by users.

### ReportCategory

Categories for classifying types of infrastructure damage.

### ReportHistory

Tracking status changes and updates for each report.

### GovernmentAgency

Government agencies responsible for resolving reported issues.

## Development

### Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon for development

## License

This project is licensed under the ISC License.
