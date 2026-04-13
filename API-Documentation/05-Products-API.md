# Products API

## Overview
Manage product inventory (CRUD operations).

**Base URL:** `/api/products`

---

## Get All Products

**Endpoint:** `GET /api/products`  
**Authentication:** Required (All roles)

### Query Parameters
- `category_id`: Filter by category
- `is_active`: true/false
- `search`: Search by name
- `low_stock`: true (shows only low stock)
- `page` (default: 1)
- `limit` (default: 20)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product-uuid",
        "category_id": "category-uuid",
        "category": {
          "name_en": "Drinks",
          "name_ar": "مشروبات"
        },
        "name_en": "Coca Cola",
        "name_ar": "كوكاكولا",
        "price": 5.00,
        "stock_quantity": 45,
        "low_stock_threshold": 10,
        "is_active": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

---

## Create Product

**Endpoint:** `POST /api/products`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "category_id": "uuid-string",
  "name_en": "Coca Cola",
  "name_ar": "كوكاكولا",
  "price": 5.00,
  "stock_quantity": 50,
  "low_stock_threshold": 10,
  "is_active": true
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "product-uuid",
    "category_id": "category-uuid",
    "name_en": "Coca Cola",
    "name_ar": "كوكاكولا",
    "price": 5.00,
    "stock_quantity": 50,
    "low_stock_threshold": 10,
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

---

## Update Product

**Endpoint:** `PUT /api/products/:id`  
**Authentication:** Required (Owner only)

### Request Body
```json
{
  "name_en": "Coca Cola Zero",
  "name_ar": "كوكاكولا زيرو",
  "price": 5.50,
  "stock_quantity": 30
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "product-uuid",
    "name_en": "Coca Cola Zero",
    "name_ar": "كوكاكولا زيرو",
    "price": 5.50,
    "stock_quantity": 30,
    "updated_at": "2024-01-15T12:00:00.000Z"
  }
}
```

---

## Delete Product

**Endpoint:** `DELETE /api/products/:id`  
**Authentication:** Required (Owner only)

### Success Response (200)
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Get Low Stock Products

**Endpoint:** `GET /api/products/low-stock`  
**Authentication:** Required (All roles)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product-uuid",
        "name_en": "Coca Cola",
        "name_ar": "كوكاكولا",
        "stock_quantity": 5,
        "low_stock_threshold": 10,
        "is_low_stock": true
      }
    ],
    "total": 3
  }
}
```

---

## Update Stock

**Endpoint:** `PUT /api/products/:id/stock`  
**Authentication:** Required (Owner, Manager)

### Request Body
```json
{
  "stock_quantity": 100,
  "reason": "Restocked from supplier"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "product-uuid",
    "stock_quantity": 100,
    "previous_stock": 5,
    "updated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

---

## TypeScript Interfaces

```typescript
interface CreateProductRequest {
  category_id: string;
  name_en: string;
  name_ar: string;
  price: number;
  stock_quantity?: number;
  low_stock_threshold?: number;
  is_active?: boolean;
}

interface UpdateProductRequest {
  category_id?: string;
  name_en?: string;
  name_ar?: string;
  price?: number;
  stock_quantity?: number;
  low_stock_threshold?: number;
  is_active?: boolean;
}

interface ProductResponse {
  id: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const createProductSchema = z.object({
  category_id: z.string().uuid('Invalid category ID'),
  name_en: z.string().min(1, 'English name is required'),
  name_ar: z.string().min(1, 'Arabic name is required'),
  price: z.number().positive('Price must be positive'),
  stock_quantity: z.number().int().min(0).default(0),
  low_stock_threshold: z.number().int().min(0).default(5),
  is_active: z.boolean().default(true)
});

export const updateProductSchema = z.object({
  category_id: z.string().uuid().optional(),
  name_en: z.string().min(1).optional(),
  name_ar: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  stock_quantity: z.number().int().min(0).optional(),
  low_stock_threshold: z.number().int().min(0).optional(),
  is_active: z.boolean().optional()
});

export const updateStockSchema = z.object({
  stock_quantity: z.number().int().min(0, 'Stock cannot be negative'),
  reason: z.string().optional()
});
```
