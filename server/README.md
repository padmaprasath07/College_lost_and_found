# 🎓 CampusFind REST API & MongoDB Database Engine

The production backend for **CampusFind**, a college lost and found management platform. Built with **Node.js, Express.js, and MongoDB (via Mongoose ODM)**, providing persistent cloud storage, compound text indexing for campus searches, and an anti-fraud security challenge verification workflow.

---

## 🛠️ Architecture & Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Local Community Server & MongoDB Atlas Cloud)
- **ODM**: Mongoose 8.x
- **Middleware**: CORS, Morgan (HTTP request logger), Dotenv

---

## 📡 REST API Endpoints

### 🩺 Health & Diagnostics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns server health, MongoDB connection state, cluster host, and collection counts |
| `POST` | `/api/seed` | Reseeds database collections with fresh campus lost & found listings (`{ "force": true }`) |

### 📦 Lost & Found Items
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/items` | Query items with optional filters: `?type=lost&category=Electronics&location=Library&search=headphones` |
| `GET` | `/api/items/:id` | Fetch single item details |
| `POST` | `/api/items` | Report a new lost or found item (auto-generates unique ID, sets status to `available`) |
| `PUT` | `/api/items/:id` | Update item details or resolution status (`available`, `claimed`) |
| `DELETE` | `/api/items/:id` | Delete item and cascade delete associated claim records |

### 🛡️ Claims & Security Verification
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/claims` | Fetch all claims (or filter by `?itemId=`) |
| `POST` | `/api/claims` | Submit proof/answer to finder's security question; marks item as `claimed` in MongoDB |

### 📊 Campus Analytics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Aggregated campus metrics (total items, lost vs. found ratio, verified claims, resolution percentage) |

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/campusfind_db
NODE_ENV=development
```

For production deployment on **MongoDB Atlas**:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/campusfind_db?retryWrites=true&w=majority
```
