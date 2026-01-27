---
title: API Reference
description: Detailed documentation for Memory CRUD operations.
---

### Add Memory

`POST /api/v1/memory`

Add a new encrypted memory to the store.

**Headers:**
- `X-Memo-API-Key`: Your YoMemoAI API key (required)
- `Content-Type`: `application/json`

**Request Body:**
| Parameter     | Type   | Description                                                      |
| :------------ | :----- | :---------------------------------------------------------------- |
| `handle`      | string | **Required**. A unique, human-readable identifier for the memory (e.g., 'passwords', 'work', 'project-alpha'). Cannot contain spaces. |
| `ciphertext`  | string | **Required**. Base64-encoded encrypted content (encrypted client-side). |
| `description` | string | Optional. A brief description of the memory.                      |
| `metadata`    | object | Optional. Key-value pairs for additional metadata.                |

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

### Get Memories

`GET /api/v1/memory`

Retrieve memories with optional filtering and pagination.

**Headers:**
- `X-Memo-API-Key`: Your YoMemoAI API key (required)

**Query Parameters:**
| Parameter    | Type   | Description                                    |
| :----------- | :----- | :---------------------------------------------- |
| `handle`     | string | Optional. Filter memories by handle.             |
| `page_size`  | int    | Optional. Number of results per page.           |
| `cursor`     | string | Optional. Pagination cursor from previous response. |
| `start_time` | int64  | Optional. Unix timestamp for start time filter. |
| `end_time`   | int64  | Optional. Unix timestamp for end time filter.   |
| `filters`    | string | Optional. JSON-encoded metadata filters.       |
| `ascending`  | bool   | Optional. Sort order (true = ascending).        |

**Example:**
```bash
curl -X GET "https://api.yomemo.ai/api/v1/memory?handle=passwords&page_size=10" \
     -H "X-Memo-API-Key: your_api_key_here"
```
