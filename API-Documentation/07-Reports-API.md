# Reports API

## Overview
Generate analytics and reports for business insights.

**Base URL:** `/api/reports`

---

## Daily Report

**Endpoint:** `GET /api/reports/daily`  
**Authentication:** Required (Manager, Owner)

### Query Parameters
- `date` (required): ISO date (YYYY-MM-DD)

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "summary": {
      "total_sessions": 45,
      "total_revenue": 1250.00,
      "cash_revenue": 850.00,
      "card_revenue": 400.00,
      "total_products_sold": 120,
      "product_revenue": 450.00,
      "average_session_value": 27.78
    },
    "peak_hours": [
      { "hour": 19, "sessions": 12, "revenue": 350.00 },
      { "hour": 20, "sessions": 10, "revenue": 280.00 },
      { "hour": 21, "sessions": 8, "revenue": 220.00 }
    ],
    "top_services": [
      { "service_name": "Green Billiards", "sessions": 25, "revenue": 750.00 },
      { "service_name": "VIP Rooms", "sessions": 20, "revenue": 500.00 }
    ],
    "cashier_performance": [
      {
        "cashier_name": "Ahmed Ali",
        "sessions_handled": 25,
        "revenue": 700.00
      }
    ]
  }
}
```

---

## Weekly Report

**Endpoint:** `GET /api/reports/weekly`  
**Authentication:** Required (Manager, Owner)

### Query Parameters
- `week_start` (required): ISO date
- `week_end` (required): ISO date

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-08",
      "end": "2024-01-14"
    },
    "summary": {
      "total_sessions": 315,
      "total_revenue": 8750.00,
      "average_daily_revenue": 1250.00,
      "total_products_sold": 840,
      "product_revenue": 3150.00
    },
    "daily_breakdown": [
      {
        "date": "2024-01-08",
        "sessions": 40,
        "revenue": 1100.00
      }
    ],
    "top_performing_day": {
      "date": "2024-01-12",
      "sessions": 55,
      "revenue": 1550.00
    }
  }
}
```

---

## Monthly Report

**Endpoint:** `GET /api/reports/monthly`  
**Authentication:** Required (Owner only)

### Query Parameters
- `month` (required): YYYY-MM format
- `year` (required): YYYY format

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "period": {
      "month": 1,
      "year": 2024
    },
    "summary": {
      "total_sessions": 1234,
      "total_revenue": 45000.00,
      "average_session_value": 36.47,
      "total_products_sold": 3200,
      "product_revenue": 12000.00,
      "total_discounts_applied": 1500.00
    },
    "comparison": {
      "previous_month_revenue": 42000.00,
      "growth_percentage": 7.14
    },
    "busiest_days": [
      { "date": "2024-01-12", "sessions": 55, "revenue": 1550.00 },
      { "date": "2024-01-13", "sessions": 52, "revenue": 1480.00 }
    ],
    "service_performance": [
      {
        "service_name": "Green Billiards",
        "sessions": 650,
        "revenue": 19500.00,
        "percentage_of_total": 43.33
      }
    ]
  }
}
```

---

## Cashier Performance Report

**Endpoint:** `GET /api/reports/cashier-performance`  
**Authentication:** Required (Manager, Owner)

### Query Parameters
- `date_from` (required): ISO date
- `date_to` (required): ISO date
- `cashier_id` (optional): Filter by specific cashier

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01",
      "end": "2024-01-15"
    },
    "cashiers": [
      {
        "cashier_id": "uuid-string",
        "cashier_name": "Ahmed Ali",
        "sessions_handled": 120,
        "total_revenue": 3500.00,
        "average_session_value": 29.17,
        "discounts_applied": 5,
        "total_discount_amount": 150.00
      }
    ],
    "rankings": [
      { "rank": 1, "cashier_name": "Ahmed Ali", "revenue": 3500.00 },
      { "rank": 2, "cashier_name": "Mohammed Hassan", "revenue": 3200.00 }
    ]
  }
}
```

---

## Product Sales Report

**Endpoint:** `GET /api/reports/product-sales`  
**Authentication:** Required (Manager, Owner)

### Query Parameters
- `date_from` (required): ISO date
- `date_to` (required): ISO date
- `category_id` (optional): Filter by category

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01",
      "end": "2024-01-15"
    },
    "total_product_revenue": 4500.00,
    "products": [
      {
        "product_id": "uuid-string",
        "product_name_en": "Coca Cola",
        "product_name_ar": "كوكاكولا",
        "quantity_sold": 150,
        "unit_price": 5.00,
        "total_revenue": 750.00,
        "percentage_of_total": 16.67
      }
    ],
    "top_selling_products": [
      { "product_name": "Coca Cola", "quantity_sold": 150 },
      { "product_name": "Chips", "quantity_sold": 120 }
    ]
  }
}
```

---

## Export Report as PDF

**Endpoint:** `GET /api/reports/export`  
**Authentication:** Required (Manager, Owner)

### Query Parameters
- `type` (required): daily, weekly, monthly
- `date` (required): Date parameter based on type
- `format`: pdf (default)

### Success Response (200)
```
Returns PDF file for download
```

### Headers
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="report-2024-01-15.pdf"
```

---

## TypeScript Interfaces

```typescript
interface DailyReportResponse {
  date: string;
  summary: {
    total_sessions: number;
    total_revenue: number;
    cash_revenue: number;
    card_revenue: number;
    total_products_sold: number;
    product_revenue: number;
    average_session_value: number;
  };
  peak_hours: Array<{
    hour: number;
    sessions: number;
    revenue: number;
  }>;
  top_services: Array<{
    service_name: string;
    sessions: number;
    revenue: number;
  }>;
  cashier_performance: Array<{
    cashier_name: string;
    sessions_handled: number;
    revenue: number;
  }>;
}

interface MonthlyReportResponse {
  period: {
    month: number;
    year: number;
  };
  summary: {
    total_sessions: number;
    total_revenue: number;
    average_session_value: number;
    total_products_sold: number;
    product_revenue: number;
  };
  comparison: {
    previous_month_revenue: number;
    growth_percentage: number;
  };
}
```
