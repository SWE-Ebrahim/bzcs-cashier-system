# Test User Credentials - LOGIN TESTING ONLY

⚠️ **WARNING**: These credentials are for TESTING PURPOSES ONLY and will be deleted later.

---

## 📝 Created Test Accounts

### 1. Owner Account
- **Email**: `swe.ebrahim@gmail.com`
- **Password**: `EA123456`
- **Full Name**: System Owner
- **Role**: owner
- **Login Page**: Select "Owner" role → Use email/password form

### 2. Manager Account
- **Employee ID**: `197905`
- **PIN**: `2004`
- **Full Name**: Test Manager
- **Role**: manager
- **Login Page**: Select "Manager" role → Use Employee ID/PIN form

### 3. Cashier Account
- **Employee ID**: `0000`
- **PIN**: `0123`
- **Full Name**: Test Cashier
- **Role**: cashier
- **Login Page**: Select "Cashier" role → Use Employee ID/PIN form

---

## 🔧 How to Recreate Test Users

If you need to recreate these test users (e.g., after database reset):

```bash
cd backend
node scripts/create-test-users.js
```

This script will:
1. Check if roles exist (owner, manager, cashier)
2. Create roles if they don't exist
3. Insert test users with bcrypt-hashed passwords/PINs
4. Assign appropriate roles to each user
5. Display credentials summary

---

## ✅ Verified Login Endpoints

All three login methods have been tested and confirmed working:

### Owner Login
```bash
POST http://localhost:5000/api/auth/login/owner
Body: {
  "email": "swe.ebrahim@gmail.com",
  "password": "EA123456"
}
```

### Manager/Cashier Login
```bash
POST http://localhost:5000/api/auth/login
Body: {
  "username": "197905",    // or "0000" for cashier
  "password": "2004"       // or "0123" for cashier
}
```

---

## 🎯 Frontend Flow

1. Visit `http://localhost:5173/` → Loading animation
2. Role selection page appears (URL stays at `/`)
3. Click role card (Owner/Manager/Cashier)
4. Navigate to `/login?role=[owner|manager|cashier]`
5. Enter credentials using the appropriate form
6. On success → Navigate to `/dashboard`
7. On failure → Error message displayed

---

## 📁 Files Created/Modified

### Backend
- ✅ `backend/scripts/create-test-users.js` - Test user creation script
- ✅ `backend/app.js` - Added cookie-parser middleware
- ✅ `backend/.env` - Added JWT_REFRESH_SECRET and JWT_REFRESH_EXPIRE
- ✅ `backend/controllers/auth.controller.js` - Enhanced error logging

### Database Tables Used
- `roles` - Role definitions (owner, manager, cashier)
- `users` - User accounts with hashed passwords
- `user_roles` - Many-to-many relationship between users and roles

---

## 🔐 Security Notes

- All passwords/PINs are hashed using bcrypt (salt rounds: 10)
- Passwords are NEVER stored in plain text
- JWT tokens are used for session management
- Refresh tokens stored in HTTP-only cookies
- Access tokens stored in localStorage (frontend)

---

## 🗑️ Cleanup Instructions

When ready to remove test users:

```sql
-- Delete test users (run in PostgreSQL)
DELETE FROM user_roles WHERE user_id IN (
  SELECT id FROM users WHERE username IN ('197905', '0000') OR email = 'swe.ebrahim@gmail.com'
);

DELETE FROM users WHERE username IN ('197905', '0000') OR email = 'swe.ebrahim@gmail.com';
```

Or simply drop and recreate the database for a clean slate.

---

**Created**: April 25, 2026  
**Purpose**: Testing login functionality before production deployment
