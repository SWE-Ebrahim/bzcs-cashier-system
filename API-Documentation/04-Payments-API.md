# Payments API

## Overview
Process payments for sessions and quick sales.

**Base URL:** `/api/payments`

---

## Process Payment

**Endpoint:** `POST /api/payments`  
**Authentication:** Required (Cashier, Manager, Owner)

### Request Body - Cash Payment
```json
{
  "session_id": "uuid-string",
  "method": "cash",
  "cash_amount": 55.00
}
```

### Request Body - Card Payment
```json
{
  "session_id": "uuid-string",
  "method": "card",
  "card_amount": 55.00
}
```

### Request Body - Split Payment
```json
{
  "session_id": "uuid-string",
  "method": "split",
  "cash_amount": 30.00,
  "card_amount": 25.00
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "payment-uuid",
    "session_id": "session-uuid",
    "method": "split",
    "amount": 55.00,
    "cash_amount": 30.00,
    "card_amount": 25.00,
    "payment_status": "completed",
    "processed_by": "user-uuid",
    "processed_at": "2024-01-15T16:00:00.000Z",
    "receipt": {
      "id": "receipt-uuid",
      "invoice_number": "INV-2024-001234"
    }
  }
}
```

### Error Responses

**Amount Mismatch (400)**
```json
{
  "success": false,
  "error": {
    "code": "AMOUNT_MISMATCH",
    "message": "Payment amount does not match session total",
    "details": {
      "expected": 55.00,
      "received": 50.00
    }
  }
}
```

**Session Not Completed (400)**
```json
{
  "success": false,
  "error": {
    "code": "SESSION_NOT_COMPLETED",
    "message": "Session must be ended before payment"
  }
}
```

---

## Get Payment Details

**Endpoint:** `GET /api/payments/:id`  
**Authentication:** Required (All roles)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "payment-uuid",
    "session": {
      "id": "session-uuid",
      "table_number": "Table 1",
      "service_name": "Green Billiards"
    },
    "method": "split",
    "amount": 55.00,
    "cash_amount": 30.00,
    "card_amount": 25.00,
    "payment_status": "completed",
    "processed_by": {
      "id": "user-uuid",
      "name": "Ahmed Ali"
    },
    "processed_at": "2024-01-15T16:00:00.000Z",
    "receipt": {
      "invoice_number": "INV-2024-001234",
      "printed": true
    }
  }
}
```

---

## Get Payment History

**Endpoint:** `GET /api/payments`  
**Authentication:** Required (All roles)

### Query Parameters
- `date_from`: ISO date
- `date_to`: ISO date
- `method`: cash, card, split
- `cashier_id`: Filter by cashier
- `page` (default: 1)
- `limit` (default: 20)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "payment-uuid",
        "session_id": "session-uuid",
        "table_number": "Table 1",
        "method": "cash",
        "amount": 55.00,
        "processed_by": "Ahmed Ali",
        "processed_at": "2024-01-15T16:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 250,
      "totalPages": 13
    }
  }
}
```

---

## TypeScript Interfaces

```typescript
interface ProcessPaymentRequest {
  session_id?: string;
  quick_sale_id?: string;
  method: 'cash' | 'card' | 'split';
  cash_amount?: number;
  card_amount?: number;
}

interface PaymentResponse {
  id: string;
  session_id?: string;
  quick_sale_id?: string;
  method: string;
  amount: number;
  cash_amount?: number;
  card_amount?: number;
  payment_status: string;
  processed_by: string;
  processed_at: string;
}
```

---

## Zod Validation Schema

```typescript
import { z } from 'zod';

export const processPaymentSchema = z.object({
  session_id: z.string().uuid().optional(),
  quick_sale_id: z.string().uuid().optional(),
  method: z.enum(['cash', 'card', 'split']),
  cash_amount: z.number().min(0).optional(),
  card_amount: z.number().min(0).optional()
}).refine((data) => {
  if (!data.session_id && !data.quick_sale_id) {
    return false;
  }
  return true;
}, {
  message: 'Either session_id or quick_sale_id is required'
}).refine((data) => {
  if (data.method === 'split' && (!data.cash_amount || !data.card_amount)) {
    return false;
  }
  return true;
}, {
  message: 'Split payment requires both cash_amount and card_amount'
});
```
