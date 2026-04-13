# Services API

## Overview
Manage service categories, services, and pricing packages.

**Base URL:** `/api/services`  
**Access:** Owner only (for CRUD), All roles (for viewing)

---

## Service Categories

### Get All Categories

**Endpoint:** `GET /api/service-categories`  
**Authentication:** Required (All roles)

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "category-uuid",
        "name_en": "Billiards",
        "name_ar": "بلياردو",
        "color_code": "#00FF00",
        "is_active": true,
        "services_count": 3
      }
    ]
  }
}
```

### Create Category

**Endpoint:** `POST /api/service-categories`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "name_en": "VIP Rooms",
  "name_ar": "غرف كبار الشخصيات",
  "color_code": "#FFD700",
  "is_active": true
}
```

#### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "category-uuid",
    "name_en": "VIP Rooms",
    "name_ar": "غرف كبار الشخصيات",
    "color_code": "#FFD700",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Update Category

**Endpoint:** `PUT /api/service-categories/:id`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "name_en": "Premium Billiards",
  "name_ar": "بلياردو مميز",
  "color_code": "#008000"
}
```

### Delete Category

**Endpoint:** `DELETE /api/service-categories/:id`  
**Authentication:** Required (Owner only)

---

## Services

### Get All Services

**Endpoint:** `GET /api/services`  
**Authentication:** Required (All roles)

#### Query Parameters
- `category_id`: Filter by category
- `is_active`: true/false

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "service-uuid",
        "category_id": "category-uuid",
        "category": {
          "name_en": "Billiards",
          "name_ar": "بلياردو"
        },
        "name_en": "Green Billiards",
        "name_ar": "البلياردو الأخضر",
        "is_active": true,
        "packages_count": 4
      }
    ]
  }
}
```

### Create Service

**Endpoint:** `POST /api/services`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "category_id": "uuid-string",
  "name_en": "Green Billiards",
  "name_ar": "البلياردو الأخضر",
  "is_active": true
}
```

#### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "service-uuid",
    "category_id": "category-uuid",
    "name_en": "Green Billiards",
    "name_ar": "البلياردو الأخضر",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Update Service

**Endpoint:** `PUT /api/services/:id`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "name_en": "Premium Green Billiards",
  "name_ar": "بلياردو أخضر مميز",
  "is_active": true
}
```

---

## Service Packages

### Get Packages for Service

**Endpoint:** `GET /api/services/:id/packages`  
**Authentication:** Required (All roles)

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "packages": [
      {
        "id": "package-uuid",
        "service_id": "service-uuid",
        "duration_minutes": 60,
        "price": 20.00,
        "is_active": true
      },
      {
        "id": "package-uuid-2",
        "service_id": "service-uuid",
        "duration_minutes": 120,
        "price": 35.00,
        "is_active": true
      }
    ]
  }
}
```

### Create Package

**Endpoint:** `POST /api/services/:serviceId/packages`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "duration_minutes": 120,
  "price": 30.00,
  "is_active": true
}
```

#### Success Response (201)
```json
{
  "success": true,
  "data": {
    "id": "package-uuid",
    "service_id": "service-uuid",
    "duration_minutes": 120,
    "price": 30.00,
    "is_active": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Update Package

**Endpoint:** `PUT /api/packages/:id`  
**Authentication:** Required (Owner only)

#### Request Body
```json
{
  "duration_minutes": 150,
  "price": 35.00,
  "is_active": true
}
```

### Delete Package

**Endpoint:** `DELETE /api/packages/:id`  
**Authentication:** Required (Owner only)

---

## TypeScript Interfaces

```typescript
interface CreateCategoryRequest {
  name_en: string;
  name_ar: string;
  color_code: string;
  is_active?: boolean;
}

interface CreateServiceRequest {
  category_id: string;
  name_en: string;
  name_ar: string;
  is_active?: boolean;
}

interface CreatePackageRequest {
  duration_minutes: number;
  price: number;
  is_active?: boolean;
}

interface CategoryResponse {
  id: string;
  name_en: string;
  name_ar: string;
  color_code: string;
  is_active: boolean;
  services_count?: number;
  created_at: string;
}

interface ServiceResponse {
  id: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  is_active: boolean;
  packages_count?: number;
  created_at: string;
}

interface PackageResponse {
  id: string;
  service_id: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
}
```

---

## Zod Validation Schemas

```typescript
import { z } from 'zod';

export const createCategorySchema = z.object({
  name_en: z.string().min(1, 'English name is required'),
  name_ar: z.string().min(1, 'Arabic name is required'),
  color_code: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color code'),
  is_active: z.boolean().default(true)
});

export const createServiceSchema = z.object({
  category_id: z.string().uuid('Invalid category ID'),
  name_en: z.string().min(1, 'English name is required'),
  name_ar: z.string().min(1, 'Arabic name is required'),
  is_active: z.boolean().default(true)
});

export const createPackageSchema = z.object({
  duration_minutes: z.number().int().positive('Duration must be positive'),
  price: z.number().positive('Price must be positive'),
  is_active: z.boolean().default(true)
});
```
