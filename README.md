# Events-Booking-System - Full Stack Event Management Application

> "It is not just a name, it's a promise"

A comprehensive event management platform built with React.js, Node.js, Express, and MySQL.

## 🚀 Features

### Public Features
- **Home Page**: Showcases sample events, achievements, and customer testimonials
- **Authentication**: Signup/Login with role-based access (User/Admin)

### User Features
- **Dashboard**: Access to 5 main service categories
- **Service Categories**:
  - 🌸 Decoration (Flower, Balloon, Lighting)
  - 📸 Photography (Photo, Video, Combo packages)
  - 🍽️ Catering (Veg, Non-Veg, Mixed, Tiffin)
  - 🎵 Entertainment (DJ, Sangeet, Mehndi, Orchestra)
  - 💄 Makeup (Bride, Groom, Hairstyles, Saree Draping)
- **Shopping Cart**: Add services with budget selection
- **Booking System**: Complete event booking with contact details

### Admin Features
- **Admin Dashboard**: View all bookings and customer details
- **Contact Management**: Direct call/email functionality
- **Booking Overview**: Complete booking details with service breakdown

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MySQL** database
- **JWT** authentication
- **bcryptjs** for password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Events-Booking-Systems
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Database Setup
1. Create a MySQL database named `Events-Booking-System`
2. Copy `server/.env.example` to `server/.env`
3. Update the database configuration in `.env`:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=Events-Booking-System
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Start the Application
```bash
# From the root directory, start both client and server
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Booking Items Table
```sql
CREATE TABLE booking_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/my-bookings` - Get user's bookings

## 🎨 Design Features

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Premium Aesthetics**: Apple-level design attention to detail
- **Consistent Branding**: Purple and gold color scheme throughout

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Input validation and sanitization
- Protected routes and API endpoints

## 📱 Usage

1. **Sign Up**: Create an account as User or Admin
2. **Browse Services**: Explore different event service categories
3. **Add to Cart**: Select services with preferred budget tiers
4. **Book Event**: Complete booking with contact information
5. **Admin Management**: Admins can view and manage all bookings

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
npm run build
# Deploy with environment variables configured
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and queries, please contact the  Events-Booking-System team.

---

**Events-Booking-System** - Where every event becomes an unforgettable experience! ✨