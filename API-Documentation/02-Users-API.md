# Users API

## Overview
Manage system users (CRUD operations).

**Base URL:** `/api/users`  
**Access:** Owner only

**User Credentials:**
- **Cashier/Manager:** Username + Password (no email required)
- **Owner:** Email + Password (username not required)

---

## Get All Users

**Endpoint:** `GET /api/users`  
**Authentication:** Required (Owner only)

### Query Parameters
- `role` (optional): cashier, manager, owner
- `is_active` (optional): true/false
- `search` (optional): Search by name, username, or email
- `page` (default: 1)
- `limit` (default: 20)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid-string",
        "username": "cashier01",
        "email": null,
        "name": "Ahmed Ali",
        "role": "cashier",
        "is_active": true,
        "created_at": "2024-01-01T10:00:00.000Z",
        "last_login": "2024-01-15T14:00:00.000Z"
      },
      {
        "id": "uuid-string-2",
        "username": null,
        "email": "owner@alrukn.com",
        "name": "Ebrahim Al Mahbosh",
        "role": "owner",
        "is_active": true,
        "created_at": "2024-01-01T10:00:00.000Z",
        "last_login": "2024-01-15T14:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

---

## Create Cashier/Manager User

**Endpoint:** `POST /api/users`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "username": "cashier01",
  "password": "SecurePass123!",
  "name": "Ahmed Ali",
  "role": "cashier",
  "is_active": true
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": "cashier01",
    "email": null,
    "name": "Ahmed Ali",
    "role": "cashier",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Error Responses

**Username Exists (409)**
```json
{
  "success": false,
  "error": {
    "code": "USERNAME_EXISTS",
    "message": "Username already taken"
  }
}
```

**Invalid Role (400)**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ROLE",
    "message": "Role must be cashier or manager for this endpoint"
  }
}
```

---

## Create Owner User

**Endpoint:** `POST /api/users/owner`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "email": "newowner@alrukn.com",
  "password": "SecureOwnerPass123!",
  "name": "New Owner Name",
  "role": "owner",
  "is_active": true
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": null,
    "email": "newowner@alrukn.com",
    "name": "New Owner Name",
    "role": "owner",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Error Responses

**Email Exists (409)**
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already registered"
  }
}
```

---

## Get User by ID

**Endpoint:** `GET /api/users/:id`  
**Authentication:** Required (Owner only)

### Success Response (200) - Cashier/Manager
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": "cashier01",
    "email": null,
    "name": "Ahmed Ali",
    "role": "cashier",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-10T12:00:00.000Z"
  }
}
```

### Success Response (200) - Owner
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": null,
    "email": "owner@alrukn.com",
    "name": "Ebrahim Al Mahbosh",
    "role": "owner",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-10T12:00:00.000Z"
  }
}
```

---

## Update Cashier/Manager User

**Endpoint:** `PUT /api/users/:id`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "username": "cashier01_updated",
  "name": "Ahmed Ali Updated",
  "is_active": true
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": "cashier01_updated",
    "email": null,
    "name": "Ahmed Ali Updated",
    "role": "cashier",
    "is_active": true,
    "updated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

---

## Update Owner User

**Endpoint:** `PUT /api/users/:id`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "email": "newowner@alrukn.com",
  "name": "Updated Owner Name",
  "is_active": true
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": null,
    "email": "newowner@alrukn.com",
    "name": "Updated Owner Name",
    "role": "owner",
    "is_active": true,
    "updated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

---

## Delete User

**Endpoint:** `DELETE /api/users/:id`  
**Authentication:** Required (Owner only)

### Success Response (200)
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Error Responses

**Cannot Delete Self (400)**
```json
{
  "success": false,
  "error": {
    "code": "CANNOT_DELETE_SELF",
    "message": "You cannot delete your own account"
  }
}
```

**Cannot Delete Last Owner (400)**
```json
{
  "success": false,
  "error": {
    "code": "LAST_OWNER",
    "message": "Cannot delete the last owner account"
  }
}
```

---

## Change User Password

**Endpoint:** `PUT /api/users/:id/password`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "new_password": "NewSecurePass456!"
}
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Deactivate User

**Endpoint:** `PUT /api/users/:id/deactivate`  
**Authentication:** Required (Owner only)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "username": "cashier01",
    "email": null,
    "is_active": false,
    "deactivated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

---

## TypeScript Interfaces

```typescript
interface CreateCashierManagerRequest {
  username: string;
  password: string;
  name: string;
  role: 'cashier' | 'manager';
  is_active?: boolean;
}

interface CreateOwnerRequest {
  email: string;
  password: string;
  name: string;
  role: 'owner';
  is_active?: boolean;
}

interface UpdateCashierManagerRequest {
  username?: string;
  name?: string;
  is_active?: boolean;
}

interface UpdateOwnerRequest {
  email?: string;
  name?: string;
  is_active?: boolean;
}

interface UserResponse {
  id: string;
  username: string | null;
  email: string | null;
  name: string;
  role: 'cashier' | 'manager' | 'owner';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const createCashierManagerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['cashier', 'manager']),
  is_active: z.boolean().default(true)
});

export const createOwnerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.literal('owner'),
  is_active: z.boolean().default(true)
});

export const updateCashierManagerSchema = z.object({
  username: z.string().min(3).optional(),
  name: z.string().min(1).optional(),
  is_active: z.boolean().optional()
});

export const updateOwnerSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  is_active: z.boolean().optional()
});

export const changePasswordSchema = z.object({
  new_password: z.string().min(8, 'Password must be at least 8 characters')
});
```
