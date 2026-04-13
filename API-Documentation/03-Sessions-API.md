# Sessions API

## Overview
Manage gaming sessions (start, extend, end, cancel).

**Base URL:** `/api/sessions`

---

## Start New Session

**Endpoint:** `POST /api/sessions`  
**Authentication:** Required (Cashier, Manager, Owner)

### Request Body
```json
{
  "gaming_table_id": "uuid-string",
  "package_id": "uuid-string",
  "started_at": "2024-01-15T14:00:00.000Z"
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "session-uuid",
    "gaming_table_id": "table-uuid",
    "service_id": "service-uuid",
    "package_id": "package-uuid",
    "cashier_id": "user-uuid",
    "shift_id": "shift-uuid",
    "started_at": "2024-01-15T14:00:00.000Z",
    "ends_at": "2024-01-15T16:00:00.000Z",
    "status": "active",
    "base_price": 30.00,
    "total_price": 30.00,
    "payment_status": "pending"
  }
}
```

### Error Responses

**Table Occupied (409)**
```json
{
  "success": false,
  "error": {
    "code": "TABLE_OCCUPIED",
    "message": "This table is currently occupied"
  }
}
```

---

## Get Active Sessions

**Endpoint:** `GET /api/sessions/active`  
**Authentication:** Required (All roles)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session-uuid",
        "gaming_table": {
          "id": "table-uuid",
          "table_number": "Table 1"
        },
        "package": {
          "duration_minutes": 120,
          "price": 30.00
        },
        "started_at": "2024-01-15T14:00:00.000Z",
        "ends_at": "2024-01-15T16:00:00.000Z",
        "status": "active",
        "total_price": 45.00,
        "items_count": 3
      }
    ],
    "total": 1
  }
}
```

---

## Get Session Details

**Endpoint:** `GET /api/sessions/:id`  
**Authentication:** Required (All roles)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "session-uuid",
    "gaming_table": {
      "table_number": "Table 1"
    },
    "service": {
      "name_en": "Green Billiards",
      "name_ar": "البلياردو الأخضر"
    },
    "package": {
      "duration_minutes": 120,
      "price": 30.00
    },
    "cashier": {
      "name": "Ahmed Ali"
    },
    "started_at": "2024-01-15T14:00:00.000Z",
    "ends_at": "2024-01-15T16:00:00.000Z",
    "status": "active",
    "base_price": 30.00,
    "total_price": 45.00,
    "payment_status": "pending",
    "items": [
      {
        "product": {
          "name_en": "Coca Cola",
          "name_ar": "كوكاكولا"
        },
        "quantity": 2,
        "unit_price": 5.00,
        "subtotal": 10.00
      }
    ]
  }
}
```

---

## Extend Session

**Endpoint:** `POST /api/sessions/:id/extensions`  
**Authentication:** Required (Cashier, Manager, Owner)

### Request Body
```json
{
  "package_id": "uuid-string"
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "extension": {
      "id": "extension-uuid",
      "package_id": "package-uuid",
      "extended_at": "2024-01-15T15:30:00.000Z",
      "price": 15.00
    },
    "session": {
      "id": "session-uuid",
      "ends_at": "2024-01-15T17:00:00.000Z",
      "total_price": 60.00,
      "status": "extended"
    }
  }
}
```

---

## Add Items to Session

**Endpoint:** `POST /api/sessions/:id/items`  
**Authentication:** Required (Cashier, Manager, Owner)

### Request Body
```json
{
  "items": [
    {
      "product_id": "uuid-string",
      "quantity": 2
    }
  ]
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item-uuid",
        "product_id": "product-uuid",
        "quantity": 2,
        "unit_price": 5.00,
        "subtotal": 10.00
      }
    ],
    "session": {
      "id": "session-uuid",
      "total_price": 55.00,
      "items_count": 4
    }
  }
}
```

---

## End Session

**Endpoint:** `PUT /api/sessions/:id/end`  
**Authentication:** Required (Cashier, Manager, Owner)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "session-uuid",
    "status": "completed",
    "ended_at": "2024-01-15T15:45:00.000Z",
    "total_price": 55.00,
    "payment_status": "pending"
  }
}
```

---

## Cancel Session

**Endpoint:** `PUT /api/sessions/:id/cancel`  
**Authentication:** Required (Manager, Owner only)

### Request Body
```json
{
  "reason": "Customer request"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "session-uuid",
    "status": "cancelled",
    "cancel_reason": "Customer request"
  }
}
```

---

## Apply Discount

**Endpoint:** `PUT /api/sessions/:id/discount`  
**Authentication:** Required (Manager, Owner only)

### Request Body
```json
{
  "discount_amount": 10.00,
  "reason": "Regular customer"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "session-uuid",
    "discount_amount": 10.00,
    "discount_reason": "Regular customer",
    "total_price": 45.00
  }
}
```

### Error Response

**Discount Exceeds Limit (400)**
```json
{
  "success": false,
  "error": {
    "code": "DISCOUNT_EXCEEDS_LIMIT",
    "message": "Discount cannot exceed 25% of total"
  }
}
```

---

## Get Session History

**Endpoint:** `GET /api/sessions`  
**Authentication:** Required (All roles)

### Query Parameters
- `status`: active, completed, cancelled
- `date_from`: ISO date
- `date_to`: ISO date
- `cashier_id`: Filter by cashier
- `page` (default: 1)
- `limit` (default: 20)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session-uuid",
        "table_number": "Table 1",
        "service_name": "Green Billiards",
        "cashier_name": "Ahmed Ali",
        "started_at": "2024-01-15T14:00:00.000Z",
        "ended_at": "2024-01-15T16:00:00.000Z",
        "total_price": 55.00,
        "status": "completed",
        "payment_status": "paid"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

## TypeScript Interfaces

```typescript
interface CreateSessionRequest {
  gaming_table_id: string;
  package_id: string;
  started_at?: string;
}

interface SessionResponse {
  id: string;
  gaming_table_id: string;
  service_id: string;
  package_id: string;
  cashier_id: string;
  shift_id: string;
  started_at: string;
  ends_at: string;
  ended_at?: string;
  status: 'active' | 'extended' | 'completed' | 'cancelled';
  base_price: number;
  total_price: number;
  discount_amount?: number;
  discount_reason?: string;
  cancel_reason?: string;
  payment_status: 'pending' | 'paid';
}

interface AddItemsRequest {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const createSessionSchema = z.object({
  gaming_table_id: z.string().uuid('Invalid table ID'),
  package_id: z.string().uuid('Invalid package ID'),
  started_at: z.string().datetime().optional()
});

export const addItemsSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.string().uuid('Invalid product ID'),
      quantity: z.number().int().positive('Quantity must be positive')
    })
  ).min(1, 'At least one item required')
});

export const extendSessionSchema = z.object({
  package_id: z.string().uuid('Invalid package ID')
});

export const applyDiscountSchema = z.object({
  discount_amount: z.number().positive('Discount must be positive'),
  reason: z.string().min(1, 'Reason is required')
});

export const cancelSessionSchema = z.object({
  reason: z.string().min(1, 'Cancellation reason is required')
});
```
