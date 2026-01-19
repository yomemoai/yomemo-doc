---
title: API Reference
description: Detailed documentation for Memory CRUD operations.
---

### Add Memory

`POST /v1/memos`

Add a new fact or interaction to the long-term memory.

| Parameter  | Type   | Description                                        |
| :--------- | :----- | :------------------------------------------------- |
| `user_id`  | string | **Required**. Unique identifier for your end-user. |
| `content`  | string | **Required**. The text to be remembered.           |
| `metadata` | object | Optional key-value pairs for filtering.            |

### Query Memory

`GET /v1/memos?user_id=...&query=...`

Retrieve relevant memories based on a natural language query.

```bash
curl -X GET "[https://api.yourproject.com/v1/memos?user_id=user_123&query=coding+preferences](https://api.yourproject.com/v1/memos?user_id=user_123&query=coding+preferences)" \
     -H "Authorization: Bearer $API_KEY"
```
