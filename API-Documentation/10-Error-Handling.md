# Error Handling

## Overview
Standardized error response format for all API endpoints.

---

## Error Response Structure

All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

---

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | Success |
| **201** | Created |
| **400** | Bad Request (validation error) |
| **401** | Unauthorized (authentication required) |
| **403** | Forbidden (insufficient permissions) |
| **404** | Not Found (resource doesn't exist) |
| **409** | Conflict (resource already exists) |
| **422** | Unprocessable Entity (validation failed) |
| **429** | Too Many Requests (rate limit exceeded) |
| **500** | Internal Server Error |

---

## Authentication Errors

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {
      "redirect_url": "/login"
    }
  }
}
```

### Token Expired

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired",
    "details": {
      "refresh_url": "/api/auth/refresh"
    }
  }
}
```

### Invalid Token

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_INVALID",
    "message": "Token is invalid or malformed"
  }
}
```

---

## Authorization Errors

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource",
    "details": {
      "required_role": "manager",
      "your_role": "cashier"
    }
  }
}
```

---

## Validation Errors

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      {
        "field": "username",
        "message": "Username must be at least 3 characters"
      },
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Missing Required Field

```json
{
  "success": false,
  "error": {
    "code": "MISSING_FIELD",
    "message": "Required field is missing",
    "details": {
      "field": "gaming_table_id",
      "message": "Gaming table ID is required"
    }
  }
}
```

---

## Resource Errors

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": {
      "resource": "session",
      "id": "invalid-uuid"
    }
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists",
    "details": {
      "resource": "user",
      "field": "username",
      "value": "cashier01"
    }
  }
}
```

---

## Business Logic Errors

### Table Occupied

```json
{
  "success": false,
  "error": {
    "code": "TABLE_OCCUPIED",
    "message": "This table is currently occupied",
    "details": {
      "table_id": "uuid",
      "current_session_id": "uuid",
      "ends_at": "2024-01-15T16:00:00.000Z"
    }
  }
}
```

### Amount Mismatch

```json
{
  "success": false,
  "error": {
    "code": "AMOUNT_MISMATCH",
    "message": "Payment amount does not match session total",
    "details": {
      "expected": 55.00,
      "received": 50.00,
      "difference": 5.00
    }
  }
}
```

### Discount Exceeds Limit

```json
{
  "success": false,
  "error": {
    "code": "DISCOUNT_EXCEEDS_LIMIT",
    "message": "Discount cannot exceed 25% of total",
    "details": {
      "requested_discount": 20.00,
      "max_allowed": 13.75,
      "session_total": 55.00
    }
  }
}
```

### Insufficient Stock

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Product out of stock",
    "details": {
      "product_id": "uuid",
      "product_name": "Coca Cola",
      "requested_quantity": 5,
      "available_quantity": 3
    }
  }
}
```

---

## Rate Limiting

### 429 Too Many Requests

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 100,
      "window": "15 minutes",
      "retry_after": 300
    }
  }
}
```

**Rate Limits:**
- Login: 5 requests/minute
- API calls: 100 requests/15 minutes
- Payment processing: 10 requests/minute

---

## Server Errors

### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "details": {
      "error_id": "err_12345",
      "timestamp": "2024-01-15T14:00:00.000Z"
    }
  }
}
```

### Database Error

```json
{
  "success": false,
  "error": {
    "code": "DATABASE_ERROR",
    "message": "Database operation failed",
    "details": {
      "error_id": "db_err_12345"
    }
  }
}
```

---

## Error Handling in Frontend

### TypeScript Error Handler

```typescript
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

interface ApiResponse<T> {
  success: true;
  data: T;
}

type Response<T> = ApiResponse<T> | ApiError;

async function handleApiError(error: ApiError) {
  switch (error.error.code) {
    case 'TOKEN_EXPIRED':
      // Refresh token and retry
      await refreshToken();
      break;
    
    case 'UNAUTHORIZED':
      // Redirect to login
      window.location.href = '/login';
      break;
    
    case 'FORBIDDEN':
      // Show permission error
      showError('You do not have permission to perform this action');
      break;
    
    case 'VALIDATION_ERROR':
      // Show field-level errors
      error.error.details.forEach((detail) => {
        showFieldError(detail.field, detail.message);
      });
      break;
    
    case 'TABLE_OCCUPIED':
      // Show table occupied message
      showError('This table is currently occupied');
      break;
    
    default:
      // Show generic error
      showError(error.error.message);
  }
}
```

### React Error Boundary

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## Logging Strategy

### Server-Side Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log errors
logger.error('Database connection failed', {
  error: error.message,
  timestamp: new Date().toISOString(),
  requestId: 'req_12345'
});
```

### Client-Side Logging

```typescript
// Log API errors
function logApiError(endpoint: string, error: ApiError) {
  console.error(`API Error at ${endpoint}:`, error);
  
  // Send to error tracking service
  // e.g., Sentry.captureException(error);
}
```

---

## Best Practices

### ✅ DO:
- Use consistent error format across all endpoints
- Include error codes for programmatic handling
- Provide human-readable messages
- Log errors on server for debugging
- Include error IDs for tracking
- Validate input before processing
- Return appropriate HTTP status codes

### ❌ DON'T:
- Expose stack traces in production
- Include sensitive data in error messages
- Use generic "Error occurred" messages
- Forget to log errors
- Return 200 status for errors
- Expose internal system details

---

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | No authentication token |
| `TOKEN_EXPIRED` | 401 | Token has expired |
| `TOKEN_INVALID` | 401 | Invalid token format |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `MISSING_FIELD` | 400 | Required field missing |
| `CONFLICT` | 409 | Resource already exists |
| `TABLE_OCCUPIED` | 409 | Table is in use |
| `AMOUNT_MISMATCH` | 400 | Payment amount incorrect |
| `DISCOUNT_EXCEEDS_LIMIT` | 400 | Discount too high |
| `INSUFFICIENT_STOCK` | 400 | Not enough inventory |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `DATABASE_ERROR` | 500 | Database operation failed |
