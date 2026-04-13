# Authentication API

## Overview
JWT-based authentication with role-based access control (RBAC).

**Base URL:** `/api/auth`

**Login Methods:**
- **Cashier/Manager:** Username + Password
- **Owner:** Email + Password

---

## Login (Cashier/Manager)

**Endpoint:** `POST /api/auth/login`  
**Authentication:** None  
**Rate Limit:** 5 requests/minute

### Request Body
```json
{
  "username": "cashier01",
  "password": "SecurePass123!"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "username": "cashier01",
      "name": "Ahmed Ali",
      "role": "cashier",
      "is_active": true
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Error Responses

**Invalid Credentials (401)**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password"
  }
}
```

**Account Inactive (403)**
```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_INACTIVE",
    "message": "Your account has been deactivated"
  }
}
```

---

## Login (Owner)

**Endpoint:** `POST /api/auth/login/owner`  
**Authentication:** None  
**Rate Limit:** 5 requests/minute

### Request Body
```json
{
  "email": "owner@alrukn.com",
  "password": "SecureOwnerPass123!"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "owner@alrukn.com",
      "name": "Ebrahim Al Mahbosh",
      "role": "owner",
      "is_active": true
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Error Responses

**Invalid Credentials (401)**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Not Owner Account (403)**
```json
{
  "success": false,
  "error": {
    "code": "NOT_OWNER",
    "message": "This endpoint is for owner accounts only"
  }
}
```

---

## Refresh Token

**Endpoint:** `POST /api/auth/refresh`  
**Authentication:** Refresh Token (HttpOnly Cookie)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Logout

**Endpoint:** `POST /api/auth/logout`  
**Authentication:** Access Token Required

### Success Response (200)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Get Current User

**Endpoint:** `GET /api/auth/me`  
**Authentication:** Access Token Required

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": "cashier01",
    "email": "cashier01@alrukn.com",
    "name": "Ahmed Ali",
    "role": "cashier",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00.000Z"
  }
}
```

---

## Role-Based Access

| Role | Login Method | Permissions |
|------|-------------|-------------|
| **Cashier** | Username + Password | Start/end sessions, process payments, quick sales |
| **Manager** | Username + Password | All cashier + cancel sessions, discounts (≤25%), view reports |
| **Owner** | Email + Password | All manager + manage users, services, settings, purge data |

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Wrong username/email or password |
| `ACCOUNT_INACTIVE` | 403 | Account has been deactivated |
| `NOT_OWNER` | 403 | Endpoint restricted to owner role |
| `TOKEN_EXPIRED` | 401 | Access token has expired |
| `TOKEN_INVALID` | 401 | Token is malformed or invalid |
| `UNAUTHORIZED` | 401 | No token provided |
| `FORBIDDEN` | 403 | Insufficient permissions |

---

## TypeScript Interfaces

```typescript
interface CashierManagerLoginRequest {
  username: string;
  password: string;
}

interface OwnerLoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    username?: string;
    email?: string;
    name: string;
    role: 'cashier' | 'manager' | 'owner';
    is_active: boolean;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const cashierManagerLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const ownerLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});
```
