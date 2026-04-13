# Admin API

## Overview
System administration endpoints (Owner only access).

**Base URL:** `/api/admin`  
**Access:** Owner only

---

## Business Settings

### Get Settings

**Endpoint:** `GET /api/admin/settings`  
**Authentication:** Required (Owner only)

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "settings-uuid",
    "business_name": "Al Rukn Zone",
    "business_phone": "+971-XXX-XXXX",
    "business_address": "UAE Address",
    "tax_number": "TAX123456",
    "receipt_header": "Welcome to Al Rukn Zone!",
    "receipt_footer": "Thank you for visiting!",
    "currency": "AED",
    "operating_hours_start": "09:00:00",
    "operating_hours_end": "05:00:00",
    "tax_percentage": 0.00,
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Update Settings

**Endpoint:** `PUT /api/admin/settings`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "business_name": "Al Rukn Gaming Zone",
  "business_phone": "+971-50-1234567",
  "tax_percentage": 5.00,
  "receipt_header": "Welcome!",
  "receipt_footer": "Thank you!"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "settings-uuid",
    "business_name": "Al Rukn Gaming Zone",
    "updated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

---

## Shift Management

### Create Shift

**Endpoint:** `POST /api/admin/shifts`  
**Authentication:** Required (Owner, Manager)

#### Request Body
```json
{
  "name": "Morning Shift",
  "shift_date": "2024-01-16",
  "start_time": "09:00:00",
  "end_time": "17:00:00",
  "starting_cash": 500.00
}
```

#### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "shift-uuid",
    "name": "Morning Shift",
    "shift_date": "2024-01-16",
    "start_time": "09:00:00",
    "end_time": "17:00:00",
    "starting_cash": 500.00,
    "created_by": "user-uuid",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Get All Shifts

**Endpoint:** `GET /api/admin/shifts`  
**Authentication:** Required (Owner, Manager)

#### Query Parameters
- `date_from`: ISO date
- `date_to`: ISO date
- `status`: active, completed

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "shifts": [
      {
        "id": "shift-uuid",
        "name": "Morning Shift",
        "shift_date": "2024-01-16",
        "start_time": "09:00:00",
        "end_time": "17:00:00",
        "starting_cash": 500.00,
        "expected_cash": 1200.00,
        "actual_cash": 1195.00,
        "cash_difference": -5.00,
        "status": "completed"
      }
    ]
  }
}
```

### Close Shift

**Endpoint:** `PUT /api/admin/shifts/:id/close`  
**Authentication:** Required (Owner, Manager)

#### Request Body
```json
{
  "actual_cash": 1195.00,
  "notes": "Short 5 AED - given as change"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "shift-uuid",
    "status": "completed",
    "starting_cash": 500.00,
    "expected_cash": 1200.00,
    "actual_cash": 1195.00,
    "cash_difference": -5.00,
    "closed_at": "2024-01-16T17:00:00.000Z"
  }
}
```

---

## Audit Logs

### Get Audit Logs

**Endpoint:** `GET /api/admin/audit-logs`  
**Authentication:** Required (Owner, Manager)

#### Query Parameters
- `date_from`: ISO date
- `date_to`: ISO date
- `user_id`: Filter by user
- `action_type`: Filter by action
- `entity_type`: Filter by entity
- `page` (default: 1)
- `limit` (default: 50)

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log-uuid",
        "user": {
          "id": "user-uuid",
          "name": "Ahmed Ali"
        },
        "action": "APPLY_DISCOUNT",
        "entity_type": "sessions",
        "entity_id": "session-uuid",
        "old_value": "{\"total_price\": 55.00}",
        "new_value": "{\"total_price\": 45.00}",
        "ip_address": "192.168.1.100",
        "user_agent": "Mozilla/5.0...",
        "created_at": "2024-01-15T14:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 2500,
      "totalPages": 50
    }
  }
}
```

---

## Monthly Data Purge

**Endpoint:** `POST /api/admin/purge-data`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "confirmation_text": "DELETE",
  "password": "owner-password"
}
```

### Success Response (200)
```json
{
  "success": true,
  "message": "All transaction data purged successfully",
  "data": {
    "sessions_deleted": 1234,
    "payments_deleted": 1234,
    "receipts_deleted": 1234,
    "audit_logs_deleted": 5000,
    "purged_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### What Gets Deleted:
- All sessions
- All payments
- All receipts
- All audit logs
- All session extensions

### What Is Preserved:
- Users and accounts
- Products and inventory
- Services and packages
- Business settings

---

## TypeScript Interfaces

```typescript
interface BusinessSettingsResponse {
  id: string;
  business_name: string;
  business_phone: string;
  tax_number: string;
  receipt_header: string;
  receipt_footer: string;
  currency: string;
  operating_hours_start: string;
  operating_hours_end: string;
  tax_percentage: number;
  updated_at: string;
}

interface CreateShiftRequest {
  name: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  starting_cash: number;
}

interface PurgeDataRequest {
  confirmation_text: string;
  password: string;
}

interface AuditLogResponse {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value?: string;
  new_value?: string;
  ip_address: string;
  created_at: string;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const updateSettingsSchema = z.object({
  business_name: z.string().min(1).optional(),
  business_phone: z.string().optional(),
  receipt_header: z.string().optional(),
  receipt_footer: z.string().optional(),
  currency: z.string().optional(),
  tax_percentage: z.number().min(0).max(100).optional()
});

export const createShiftSchema = z.object({
  name: z.string().min(1, 'Shift name is required'),
  shift_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  start_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  end_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  starting_cash: z.number().min(0)
});

export const closeShiftSchema = z.object({
  actual_cash: z.number().min(0, 'Cash amount must be positive'),
  notes: z.string().optional()
});

export const purgeDataSchema = z.object({
  confirmation_text: z.string().refine((val) => val === 'DELETE', {
    message: 'Must type DELETE to confirm'
  }),
  password: z.string().min(1, 'Password is required')
});
```

