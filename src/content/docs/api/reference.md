---
title: API Reference
description: Detailed documentation for Memory CRUD operations.
---

### Add Memory (Create or Update)

`POST /api/v1/memory`

Add a new encrypted memory or update an existing one (upsert). When `idempotent_key` is provided and a memory with the same `(user, handle, idempotent_key)` already exists, the existing memory is updated instead of creating a new one; storage usage is not increased on update.

**Headers:**

- `X-Memo-API-Key`: Your YoMemoAI API key (required)
- `Content-Type`: `application/json`

**Request Body:**
| Parameter | Type | Description |
| :--------------- | :----- | :---------------------------------------------------------------- |
| `handle` | string | **Required**. A unique, human-readable identifier for the memory (e.g., 'passwords', 'work', 'project-alpha'). Cannot contain spaces. |
| `ciphertext` | string | **Required**. Base64-encoded encrypted content (encrypted client-side). |
| `description` | string | Optional. A brief description of the memory. |
| `metadata` | object | Optional. Key-value pairs for additional metadata. |
| `idempotent_key` | string | Optional. Idempotent key for upsert. If provided and a memory with the same (user, handle, idempotent_key) exists, that memory is updated. Recommended length ≤ 256, no control characters. When omitted, the server uses the new memory's UUID as the idempotent key. |

**Response:**

- **Created** (new memory): HTTP **201 Created**
  - Body includes `action: "created"`, `memory_id`, `idempotent_key`, and optionally `idempotent_key_tip`.
- **Updated** (existing memory with same idempotent_key): HTTP **200 OK**
  - Body includes `action: "updated"`, `memory_id`, `idempotent_key`. Storage usage is not increased.

**Example:**

```bash
curl -X POST "https://api.yomemo.ai/api/v1/memory" \
     -H "X-Memo-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "handle": "passwords",
       "ciphertext": "base64_encoded_encrypted_content",
       "description": "Coffee machine credentials",
       "metadata": {
         "category": "credentials"
       }
     }'
```

**Example with upsert (idempotent_key):**

```bash
# First call creates; second call with same idempotent_key updates the same memory
curl -X POST "https://api.yomemo.ai/api/v1/memory" \
     -H "X-Memo-API-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "handle": "work",
       "ciphertext": "base64_encoded_encrypted_content",
       "idempotent_key": "project-alpha-progress"
     }'
```

### Get Memories

`GET /api/v1/memory`

Retrieve memories with optional filtering and pagination.

**Headers:**

- `X-Memo-API-Key`: Your YoMemoAI API key (required)

**Query Parameters:**
| Parameter | Type | Description |
| :----------- | :----- | :---------------------------------------------- |
| `handle` | string | Optional. Filter memories by handle. Value is URL-encoded by the server. |
| `limit` | int | Optional. Number of results to return. |
| `cursor` | string | Optional. Pagination cursor from previous response. |
| `start_time` | int64 | Optional. Unix timestamp for start time filter. |
| `end_time` | int64 | Optional. Unix timestamp for end time filter. |
| `filters` | string | Optional. JSON-encoded metadata filters. |
| `ascending` | bool | Optional. Sort order (true = ascending). |
| `only_metadata` | bool | Optional. When `true`, returns only lightweight fields (id, handle, user_uuid, created_at, metadata); `description` and `content` are omitted/empty. |
| `only_summary` | bool | Optional. When `true`, returns description and metadata but omits the encrypted `content` field. |

**Response:**

- HTTP **200 OK**
- Body:

```json
{
  "data": [
    {
      "id": "uuid",
      "description": "string",
      "handle": "string",
      "user_uuid": "string",
      "content": "encrypted content (ciphertext)",
      "idempotent_key": "string",
      "created_at": "RFC3339 timestamp",
      "metadata": { "key": "value" }
    }
  ],
  "next_cursor": "base64-encoded cursor or empty string"
}
```

- Use `next_cursor` as the `cursor` query parameter on the next request to fetch the following page. When `next_cursor` is empty, there is no further page.

**Example:**

```bash
curl -X GET "https://api.yomemo.ai/api/v1/memory?handle=passwords&limit=10" \
     -H "X-Memo-API-Key: your_api_key_here"
```
