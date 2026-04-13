# Real-time Events (WebSocket)

## Overview
Real-time updates using Socket.io for live dashboard synchronization.

**Connection URL:** `ws://localhost:3000` or `wss://your-domain.com`

---

## Connection

### Connect to WebSocket

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('connect', () => {
  console.log('Connected to real-time server');
});
```

### Disconnect

```javascript
socket.disconnect();
```

---

## Events Sent from Server

### Session Started

**Event:** `session-started`  
**Emitted When:** Cashier starts a new session

```json
{
  "event": "session-started",
  "data": {
    "session": {
      "id": "session-uuid",
      "gaming_table_id": "table-uuid",
      "status": "active",
      "started_at": "2024-01-15T14:00:00.000Z",
      "ends_at": "2024-01-15T16:00:00.000Z",
      "total_price": 30.00
    },
    "table": {
      "id": "table-uuid",
      "table_number": "Table 1",
      "status": "occupied"
    }
  }
}
```

### Session Updated

**Event:** `session-updated`  
**Emitted When:** Session is modified (items added, extended)

```json
{
  "event": "session-updated",
  "data": {
    "session": {
      "id": "session-uuid",
      "total_price": 45.00,
      "items_count": 3,
      "ends_at": "2024-01-15T16:00:00.000Z"
    }
  }
}
```

### Session Ended

**Event:** `session-ended`  
**Emitted When:** Session is completed or cancelled

```json
{
  "event": "session-ended",
  "data": {
    "session_id": "session-uuid",
    "table_id": "table-uuid",
    "status": "completed"
  }
}
```

### Payment Completed

**Event:** `payment-completed`  
**Emitted When:** Payment is successfully processed

```json
{
  "event": "payment-completed",
  "data": {
    "payment_id": "payment-uuid",
    "session_id": "session-uuid",
    "amount": 55.00,
    "method": "cash"
  }
}
```

### Table Status Changed

**Event:** `table-status-changed`  
**Emitted When:** Table status changes

```json
{
  "event": "table-status-changed",
  "data": {
    "table": {
      "id": "table-uuid",
      "table_number": "Table 1",
      "status": "available",
      "current_session_id": null
    }
  }
}
```

### Low Stock Alert

**Event:** `low-stock-alert`  
**Emitted When:** Product stock falls below threshold

```json
{
  "event": "low-stock-alert",
  "data": {
    "product": {
      "id": "product-uuid",
      "name_en": "Coca Cola",
      "name_ar": "كوكاكولا",
      "stock_quantity": 5,
      "low_stock_threshold": 10
    }
  }
}
```

### Settings Updated

**Event:** `settings-updated`  
**Emitted When:** Owner updates business settings

```json
{
  "event": "settings-updated",
  "data": {
    "message": "Business settings updated",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### Data Purged

**Event:** `data-purged`  
**Emitted When:** Owner performs monthly data purge

```json
{
  "event": "data-purged",
  "data": {
    "message": "All transaction data has been purged",
    "purged_at": "2024-01-15T10:00:00.000Z"
  }
}
```

---

## Events Sent from Client

### Join Room

**Event:** `join-room`  
**Purpose:** Subscribe to specific table updates

```javascript
socket.emit('join-room', {
  room: 'table:5'
});
```

### Leave Room

**Event:** `leave-room`  
**Purpose:** Unsubscribe from table updates

```javascript
socket.emit('leave-room', {
  room: 'table:5'
});
```

---

## Error Events

### Connection Error

**Event:** `connect_error`

```json
{
  "message": "Authentication failed",
  "code": "AUTH_FAILED"
}
```

### Authorization Error

**Event:** `authorization-error`

```json
{
  "message": "Insufficient permissions",
  "code": "FORBIDDEN"
}
```

---

## React Implementation Example

```typescript
import { useEffect } from 'react';
import io from 'socket.io-client';

const useRealtimeUpdates = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      auth: { token: localStorage.getItem('token') }
    });

    // Listen for session updates
    socket.on('session-started', (data) => {
      console.log('New session started:', data);
      // Update dashboard
    });

    socket.on('session-updated', (data) => {
      console.log('Session updated:', data);
      // Update session card
    });

    socket.on('session-ended', (data) => {
      console.log('Session ended:', data);
      // Remove from active sessions
    });

    socket.on('payment-completed', (data) => {
      console.log('Payment completed:', data);
      // Update payment status
    });

    socket.on('low-stock-alert', (data) => {
      console.log('Low stock alert:', data);
      // Show notification
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useRealtimeUpdates;
```

---

## Connection Management

### Reconnection Logic

Socket.io handles reconnection automatically:

```javascript
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000
});

socket.on('reconnect', (attemptNumber) => {
  console.log(`Reconnected after ${attemptNumber} attempts`);
});

socket.on('reconnect_error', (error) => {
  console.error('Reconnection failed:', error);
});
```

---

## Rooms Structure

```
all-users          → All authenticated users
table:{id}         → Users viewing specific table
cashier-dashboard  → All cashiers
manager-dashboard  → All managers
owner-dashboard    → All owners
```

---

## Security

### Authentication

All WebSocket connections require JWT token:

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

### Authorization

Events are filtered based on user role:

- **Cashier:** Receives session events for their tables
- **Manager:** Receives all session and payment events
- **Owner:** Receives all events including system events

---

## TypeScript Interfaces

```typescript
interface SessionStartedEvent {
  event: 'session-started';
  data: {
    session: SessionResponse;
    table: TableResponse;
  };
}

interface SessionUpdatedEvent {
  event: 'session-updated';
  data: {
    session: Partial<SessionResponse>;
  };
}

interface SessionEndedEvent {
  event: 'session-ended';
  data: {
    session_id: string;
    table_id: string;
    status: string;
  };
}

interface PaymentCompletedEvent {
  event: 'payment-completed';
  data: {
    payment_id: string;
    session_id?: string;
    quick_sale_id?: string;
    amount: number;
    method: string;
  };
}

interface TableStatusChangedEvent {
  event: 'table-status-changed';
  data: {
    table: TableResponse;
  };
}

interface LowStockAlertEvent {
  event: 'low-stock-alert';
  data: {
    product: ProductResponse;
  };
}
```
